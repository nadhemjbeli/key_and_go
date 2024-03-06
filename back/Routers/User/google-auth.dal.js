const User = require('../../Models/User');

const googleAuthDal = {
    registerWithGoogle: async (oauthUser) => {
        console.log("oauthUser")
        console.log(oauthUser)
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
        console.log("auth user")
        console.log(oauthUser)
        console.log(newUser._id)
        const success = {
            message: 'User Registered.',
            userId: newUser._id
        };
        return { success };
    },

    // loginUser: async (oauthUser) => {
    //   const userExists = await User.findOne({ email: oauthUser.emails[0].value });
    //   if (userExists) {
    //     const success = {
    //       message: 'User successfully logged In.',
    //     };
    //     return { success };
    //   }
    //   const failure = {
    //     message: 'Email not Registered. You need to sign up first',
    //   };
    //   return { failure };
    // },
};

module.exports = googleAuthDal;
