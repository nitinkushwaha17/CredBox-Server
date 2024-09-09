const Order = require("../models/Order");
const Status = require("../models/Status");
const Item = require("../models/Item");

module.exports.getSingleOrder = async (req, res) => {
  // const order = await Order.findById(req.params.order_id);
  // if (!order.is_custom) {
  //   await order.populate({
  //     path: "item status",
  //     populate: { path: "item.counter item.tod" },
  //   });
  // }
  // return res.status(200).json(order);
};

module.exports.getAllOrders = async (req, res) => {
  // new orders
  const newStatusId = await Status.findOne({ name: "new" }, "_id");
  const newStatusItemIds = await Item.find({ status: newStatusId }, "_id");
  const newOrders = await Order.find({
    user: { $ne: req.query.user_id },
    item: newStatusItemIds,
  });
  const newCustomOrders = await Order.find({
    user: { $ne: req.query.user_id },
    custom_item: {
      tod: newStatusId,
    },
  });

  // orders in process but not completed
  const inProcessStatusId = await Status.findOne({ name: "in_process" }, "_id");
  const inProcessStatusItemIds = await Item.find(
    {
      status: inProcessStatusId,
    },
    "_id"
  );
  const inProcessOrders = await Order.find({
    user: { $ne: req.query.user_id },
    item: inProcessStatusItemIds,
    accepted_at: { $lt: Date.now() - 5 * 60 * 1000 },
  });
  const inProcessCustomOrders = await Order.find({
    user: { $ne: req.query.user_id },
    custom_item: {
      tod: newStatusId,
    },
    accepted_at: { $lt: Date.now() - 5 * 60 * 1000 },
  });

  // TODO: pagination and filtering
  const allOrders = [
    ...newOrders,
    ...newCustomOrders,
    ...inProcessOrders,
    ...inProcessCustomOrders,
  ];

  return res.status(200).json(allOrders);
};

module.exports.getMyOrders = async (req, res) => {
  // const myOrders = await Order.find({
  //   user: req.query.user_id,
  // }).populate("item custom_item.tod");
  // return res.status(200).json(myOrders);
};

module.exports.newOrder = async (req, res) => {
  if (req.body.is_custom) {
    const order = new Order({
      is_custom: true,
      item: {
        name: req.body.name,
        price: req.body.price,
        counter_name: req.body.counter,
        tod_id: req.body.tod_id,
      },
      status: Status.findOne({ name: "new" }, "_id"),
      user_id: req.body.user_id,
    });
    await order.save();
    return res.status(201).json(order);
  } else {
    const order = new Order({
      user: req.body.user_id,
      item: req.body.item_id,
      status: Status.findOne({ name: "new" }, "_id"),
    });
    await order.save();
    return res.status(201).json(order);
  }
};

module.exports.acceptOrder = async (req, res) => {};

module.exports.completeOrder = async (req, res) => {};

module.exports.deleteOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.body.order_id,
    user: req.body.user_id,
  });
  if (!order) res.status(404).send({ message: "Order not found" });

  await Order.findByIdAndDelete(req.body.order_id);

  return res.status(200).json({ message: "Order deleted successfully" });
};
