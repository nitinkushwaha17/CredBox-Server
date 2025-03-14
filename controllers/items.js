const Item = require("../models/Item");

module.exports.getAllCounterItems = async (req, res) => {
  let items = await Item.find(
    {
      counter: req.query.counter_id,
      tod: req.query.tod_id,
    },
    "_id name price"
  );

  return res.status(200).json(items);
};
