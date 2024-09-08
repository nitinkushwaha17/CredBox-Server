const User = require("../models/user");

module.exports.register = async (req, res) => {
  const user = new User();
  await user.save();
  res.status(201).json({ user: user._id });
};
