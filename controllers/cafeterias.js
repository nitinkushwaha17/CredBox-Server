const Cafeteria = require("../models/Cafeteria");

module.exports.getAllCafeterias = async (req, res) => {
  let cafeterias = await Cafeteria.find(
    {
      city: req.query.city_id,
    },
    "_id name"
  );

  return res.status(200).json(cafeterias);
};
