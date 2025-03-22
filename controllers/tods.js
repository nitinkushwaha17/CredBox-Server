const Tod = require("../models/tod");
const { getCurrentTimeAsHHMM } = require("../utils/time");

module.exports.getAllTods = async (req, res) => {
  const tods = await Tod.find({}).select("_id, name");
  return res.status(200).json(tods);
};

module.exports.getCurrentTod = async (req, res) => {
  const currTime = getCurrentTimeAsHHMM();
  const tods = await Tod.find({ name: { $ne: "all day" } });

  for (let i = 0; i < tods.length; i++) {
    if (currTime >= tods[i].start_time && currTime < tods[i].end_time) {
      return res.status(200).json(tods[i]);
    }
  }

  const allDayTod = await Tod.findOne({ name: { $eq: "all day" } });
  return res.status(200).json(allDayTod);
};
