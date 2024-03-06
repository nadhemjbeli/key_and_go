const express = require('express');
const {checkSubscription, upgradeSubscriptionNextMonth, upgradeTest} = require("../../Controllers/Subscription");
const {protect} = require("../../middleware/authMiddleware");
const router = express.Router();

// Route that requires subscription check
router.route('/premium-content').get(protect, checkSubscription);
router.route('/upgrade-next-month').put(protect, upgradeSubscriptionNextMonth);
router.route('/upgrade-test').post(protect, upgradeTest);

module.exports = router;