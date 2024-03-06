const {Subscription} = require("../Models/Subscription");
const {User} = require("../Models/User");
const stripe = require('stripe')(process.env.secret);
const upgradeTest = async (req, res, next)=>{
    const userId = req.user._id;
    const user = User.findOne({_id:userId}).then(async (user)=>{
        const { paymentMethodId } = req.body;

        try {
            // Create a customer in Stripe (assuming you manage customers)
            const customer = await stripe.customers.create({
                payment_method: paymentMethodId,
                email: user.email, // Get email from your user data
                // Additional customer details...
            });

            // Create a subscription for the customer
            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ plan: 'price_1OS0zcHqkQpw01a9ePpstuv9' }], // Replace with your plan ID
                // Other subscription options...
            });

            // Save the subscription ID or relevant details to your database
            // Update user's subscription status, etc.

            res.status(200).json({ message: 'Subscription upgraded successfully', subscription: subscription });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to upgrade subscription' });
        }
    })

}
const checkSubscription = async (req, res, next) => {
    const userId = req.user._id; // Assuming user ID is available in request
    // console.log(userId)
    try {
        const subscription = await Subscription.findOne({ user: userId }).exec();

        if (subscription && subscription.endDate < new Date()) {
            // Subscription has expired, handle logic (e.g., downgrade user)
            // For example, you could update the user's role to a default role.
            await User.findByIdAndUpdate(userId, { role: 'basic' });

            // You might also want to update the subscription or notify the user.
            // ...

            // Continue to the next middleware or route handler
            return next();
        }
        else if(!subscription){
            res.send("subscription is invalid")
            return next()
        }

        // Subscription is valid, continue
        res.send("subscription is valid")
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const upgradeSubscriptionNextMonth = async (req, res) => {
    const userId = req.user._id; // Assuming userId is passed in the request
    const { subscriptionType } = req.body;

    try {
        // Logic to upgrade subscription

        // Check if the user already has a subscription
        const existingSubscription = await Subscription.findOne({ user: userId }).exec();

        let startDate = new Date();
        let endDate = new Date(); // Set endDate to one month from the start date by default
        endDate.setMonth(endDate.getMonth() + 1); // One month from the start date

        if (existingSubscription && existingSubscription.endDate > new Date()) {
            // User already has a subscription, update the subscription details
            existingSubscription.subscriptionType = subscriptionType;
            // existingSubscription.startDate = startDate;
            endDate.setMonth(existingSubscription.endDate.getMonth() + 1);
            existingSubscription.endDate = endDate;
            await existingSubscription.save();
        } else {
            // Create a new subscription if the user doesn't have one
            const newSubscription = new Subscription({
                user: userId,
                subscriptionType,
                startDate,
                endDate,
            });
            await newSubscription.save();
        }

        return res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};



module.exports = {checkSubscription, upgradeSubscriptionNextMonth, upgradeTest};