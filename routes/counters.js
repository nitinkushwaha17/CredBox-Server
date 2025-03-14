const express = require("express");
const router = express.Router();
const counters = require("../controllers/counters");

router.route("/all").get(counters.getAllCounters);

module.exports = router;
