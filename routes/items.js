const express = require("express");
const router = express.Router();
const items = require("../controllers/items");

router.route("/all").get(items.getAllCounterItems);

module.exports = router;
