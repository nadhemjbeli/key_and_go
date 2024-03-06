const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // console.log("token")
            // console.log(token)
            // console.log(process.env.PK)

            //decodes token id
            const decoded = jwt.verify(token, process.env.PK);
            // console.log(decoded)
            req.userr = await User.findById(decoded.id);

            // req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const protectHote = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.PK);

            // Find the user by ID and check if hote_verifiee is true
            req.userr = await User.findOne({ _id: decoded.id, host_verified: true });
            // console.log(req.userr)
            if (!req.userr) {
                res.status(401);
                throw new Error("Not authorized, user is not a verified host");
            }

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect, protectHote }