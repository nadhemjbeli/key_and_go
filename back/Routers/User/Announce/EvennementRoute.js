const express = require("express");
const {protectHote} = require("../../../middleware/authMiddleware");
const {createEvennement, getAllEvennements, getEvennement} = require("../../../Controllers/Client/EvennementController");
const router = express.Router();

router.get('/', getAllEvennements);
router.get('/:id', getEvennement);
router.post('/', protectHote, createEvennement);

module.exports = router;