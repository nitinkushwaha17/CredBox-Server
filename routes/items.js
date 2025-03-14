const express = require("express");
const router = express.Router();
const counters = require("../controllers/items");

router.route("/all").get(counters.getAllCounterItems);

module.exports = router;
