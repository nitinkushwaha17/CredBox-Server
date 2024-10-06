const express = require("express");
const router = express.Router();
const tods = require("../controllers/tods");

router.route("/").get(tods.getAllTods);

module.exports = router;
