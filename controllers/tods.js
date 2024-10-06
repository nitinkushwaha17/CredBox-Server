const Tod = require("../models/tod");

module.exports.getAllTods = async (req, res) => {
  const tods = await Tod.find({}).select("_id, name");
  return res.status(200).json(tods);
};
