const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const User = require('../../Models/User');
const facebookAuth = require("./facebook-auth.dal");
const jwt = require("jsonwebtoken");

const router = express.Router();
require('dotenv').config();

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_SECRET_KEY,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'photos', 'email'],
        },
        async function (accessToken, refreshToken, profile, cb) {
            // console.log(profile)
            // const user = await User.findOne({
            //     accountId: profile.id,
            //     provider: 'facebook',
            // });
            // if (!user) {
            //     console.log('Adding new facebook user to DB..');
            //     const user = new User({
            //         accountId: profile.id,
            //         fullname: profile.displayName,
            //         email:profile.emails[0].value,
            //         provider: profile.provider,
            //     });
            //     await user.save();
            //     // console.log(user);
            // } else {
            //     console.log('Facebook User already exist in DB..');
            //     // console.log(profile);
            // }

            return cb(null, profile);
        }
    )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
    '/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook/error',
    }),
    function (req, res) {
        // Successful authentication, redirect to success screen.
        res.redirect('/auth/facebook/success');
    }
);

router.get('/success', async (req, res) => {
    try {
        const userInfo = {
            id: req.session.passport.user.id,
            displayName: req.session.passport.user.displayName,
            email: req.session.passport.user.emails[0].value,
            provider: req.session.passport.user.provider,
        };
        const { failure, success } = await facebookAuth.registerWithGoogle(userInfo);

        console.log('Facebook user logged in');
        // console.log(req.session)
        req.session.userId = failure.userId
        let token = jwt.sign({
            id:failure?failure.userId:success.userId
        },process.env.PK ,{
            expiresIn:'30d',
        })
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                // maxAge: 900000, // Expires in 15 minutes
            })
            .redirect('http://localhost:3000/main');
        return;

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

router.get('/signout', (req, res) => {
    try {
        req.session.destroy(function (err) {
            console.log('session destroyed.');
        });
        res.send('signed out');
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out fb user' });
    }
});

module.exports = router;
