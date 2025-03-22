const express = require("express");
const router = express.Router();
const tods = require("../controllers/tods");

router.route("/").get(tods.getAllTods);
router.route("/current").get(tods.getCurrentTod);

module.exports = router;
