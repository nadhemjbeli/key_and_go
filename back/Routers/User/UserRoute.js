const express = require("express");
const User = require("../../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage');
const {protect} = require("../../middleware/authMiddleware");

// Create an instance of LocalStorage with a specific directory (or path)
const localStorage = new LocalStorage('./scratch');
const router = express.Router();

router.route('/register').post( (req,res,next)=>{
    // console.log("register test")
    User.findOne({
        email:req.body.email
    }).then(async (result)=>{
        if(result) {
            res.status(200).send("already exists")
        }
        else{
            const {email, password, fullname} = req.body
            const character = "123456789abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let activationCode = "";
            for (let i=0;i<25;i++){
                activationCode += character[Math.floor(Math.random() * character.length)];
            }
            bcrypt.hash(password,10).then((hashedPassword)=> {
                let user = new User({
                    fullname: fullname,
                    email: email,
                    password: hashedPassword,
                })
                user.save().then((user)=>{
                    res.status(200).send({user, msg:"created"})
                })
            })


        }
    })
})

// Authentication middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    // console.log(req.session)
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Protected route - requires authentication
router.route('/authenticated').get( protect, (req, res) => {
    // Fetch authenticated user's information from the database
    // Assuming user information is stored in a User collection in MongoDB
    // console.log(req.session.userId)
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user });
        })
        .catch(error => {
            console.error('Error fetching user:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        });
});


router.route('/login').post( (req,res,next)=> {
    // console.log("register test")
    const privateKey = process.env.PK
    const {password, email} = req.body
    User.findOne({
        email: email
    }).then(async (user)=>{
        if(user){
            bcrypt.compare(password, user.password).then((same)=>{
                if(same){
                    // localStorage.setItem("mail", "value");
                    let token = jwt.sign({
                        id:user._id
                    },privateKey,{
                        expiresIn:'30d',
                    })
                    // console.log(token)
                    // res.status(200).send({user, msg:"logged in", token:token})
                    res
                        .cookie("k_g_token", token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                            // maxAge: 900000, // Expires in 15 minutes
                        })
                        .send("Cookie Set");
                    // res.cookie('myCookie', 'myValue', {
                    //     // Optional cookie options:
                    //     httpOnly: true, // Prevent client-side JavaScript access
                    //     secure: process.env.NODE_ENV === 'production', // Set only for HTTPS in production
                    //     maxAge: 900000, // Expires in 15 minutes
                    //     path: '/', // Accessible from all paths
                    // }).send("Cookie set!");

                    // res.send('Cookie set!');
                }
                else {
                    res.status(200).send("wrong password!")
                }
            })
        }
        else{
            res.status(200).send("this account doesn't exist!")
        }
    })
})

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.k_g_token;

        if (!token) return res.json(false);
        // console.log(token)
        jwt.verify(token, process.env.PK)
        res.send(true);
    } catch (err) {
        res.json(false);
    }
});


router.get("/logout", (req, res) => {
    res
        .cookie("k_g_token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        })
        .send();
});

module.exports = router;