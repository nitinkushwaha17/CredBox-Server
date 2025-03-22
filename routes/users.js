const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/test").get((req, res) => {
  return res.status(200).send("6702957c2a68d28a33bd7fae");
});
router.route("/register").post(users.register);

module.exports = router;
