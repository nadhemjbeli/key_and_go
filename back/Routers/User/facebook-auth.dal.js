const User = require('../../Models/User');

const facebookAuthDal = {
    registerWithGoogle: async (oauthUser) => {
        // console.log(oauthUser)
        const isUserExists = await User.findOne({
            accountId: oauthUser.id,
            provider: oauthUser.provider,
        });
        if (isUserExists) {
            console.log(isUserExists._id)
            const failure = {
                message: 'User already Registered.',
                userId: isUserExists._id
            };
            return { failure };
        }

        const user = new User({
            accountId: oauthUser.id,
            fullname: oauthUser.displayName,
            provider: oauthUser.provider,
            email: oauthUser.emails[0].value, //optional - storing it as extra info
            // photoURL: oauthUser.photos[0].value, //optional
        });
        const newUser = await user.save();
        console.log(newUser._id)
        const success = {
            message: 'User Registered.',
            userId: newUser._id
        };
        return { success };
    },
};
module.exports = facebookAuthDal;