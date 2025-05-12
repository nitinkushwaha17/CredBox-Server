const User = require("../models/User");

module.exports.register = async (req, res) => {
  const user = new User();
  await user.save();
  res.status(201).send(user._id);
};
