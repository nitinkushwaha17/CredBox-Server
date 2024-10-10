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
  // orders in process but not completed
  const newStatusId = await Status.findOne({ name: "new" }, "_id");

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
    status: newStatusId,
    accepted_at: { $lt: Date.now() - 5 * 60 * 1000 },
  });

  await updateOrdersInProcessToNew([
    ...inProcessOrders,
    ...inProcessCustomOrders,
  ]);

  // new orders
  const newStatusItemIds = await Item.find({ status: newStatusId }, "_id");
  const newOrders = await Order.find({
    user: { $ne: req.query.user_id },
    item: newStatusItemIds,
  }).populate({
    path: "item",
    populate: "counter tod",
  });

  const newCustomOrders = await Order.find({
    user: { $ne: req.query.user_id },
    status: newStatusId,
  })
    .populate({
      path: "custom_item.tod",
    })
    .then((items) => {
      console.log(items);
      let newCustomOrders = [];
      items.forEach((item) => {
        newCustomOrders.push({
          item: item.custom_item.name,
          price: item.custom_item.price,
          counter: item.custom_item.counter_name,
          tod: item.custom_item.tod.name,
        });
      });
      return newCustomOrders;
    });

  // .lean()

  // TODO: pagination and filtering
  const allOrders = [...newOrders, ...newCustomOrders];
  console.log(newCustomOrders);

  return res.status(200).json(allOrders);
};

module.exports.getMyOrders = async (req, res) => {
  const myOrders = await Order.find({
    user: req.query.user_id,
  }).populate("item custom_item.tod");
  return res.status(200).json(myOrders);
};

module.exports.newOrder = async (req, res) => {
  const newStatusId = await Status.findOne({ name: "new" }, "_id");

  if (req.body.is_custom) {
    const order = new Order({
      is_custom: true,
      custom_item: {
        name: req.body.item,
        price: req.body.price,
        counter_name: req.body.counter,
        tod: req.body.tod_id,
      },
      status: newStatusId,
      user: req.body.user_id,
    });

    await order.save();
    return res.status(201).json(order);
  } else {
    const order = new Order({
      user: req.body.user_id,
      item: req.body.item_id,
      status: await Status.findOne({ name: "new" }, "_id"),
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

async function updateOrdersInProcessToNew(orderIds) {
  const newStatusId = await Status.findOne({ name: "new" });
  await Order.updateMany({ _id: orderIds }, { status: newStatusId });
}
