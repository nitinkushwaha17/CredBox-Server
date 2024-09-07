const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/register").post(users.register);

module.exports = router;
