const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const googleAuth = require('./google-auth.dal');
const jwt = require("jsonwebtoken");
const router = express.Router();
require('dotenv').config();

let userProfile;
let privateKey = process.env.PK;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log(profile)
            userProfile = profile;
            return done(null, userProfile);
        }
    )
);

// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen
router.get(
    '/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
    (req, res) => {
        res.redirect('/auth/google/success'); // Successful authentication, redirect success.
    }
);

router.get('/success', async (req, res) => {

    const { failure, success } = await googleAuth.registerWithGoogle(userProfile);

        console.log('Google user already exist in DB..');
        // console.log(req.session)
        req.session.userId = failure.userId
        let token = jwt.sign({
            id:failure?failure.userId:success.userId
        },privateKey,{
            expiresIn:'30d',
        })
        res
            .cookie("k_g_token", token,
                // {
                // httpOnly: true,
                // secure: true,
                // sameSite: "none",
                // maxAge: 900000, // Expires in 15 minutes
            // }
            )
            .redirect('http://localhost:3000/main');
    return;
});

router.get('/error', (req, res) => res.send('Error logging in via Google..'));

router.get('/signout', (req, res) => {
    try {
        req.session.destroy(function (err) {
            console.log('session destroyed.');
        });
        res.status(200).send({ message: 'Signed out!' });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
});

module.exports = router;