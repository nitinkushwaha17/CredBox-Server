const Counter = require("../models/Counter");

module.exports.getAllCounters = async (req, res) => {
  let counters = await Counter.find(
    {
      cafeteria: req.query.cafeteria_id,
    },
    "_id name"
  );

  return res.status(200).json(counters);
};
