const Order = require("../models/Order");
const Status = require("../models/Status");
const Item = require("../models/Item");
const { STATUS } = require("../constants");
const { buildOrderResponse } = require("../utils/response/order");

module.exports.getSingleOrder = async (req, res) => {
  let order = await Order.findById(req.params.order_id)
    .populate({
      path: "item",
      populate: "counter tod",
    })
    .populate({
      path: "status custom_item.tod",
    });

  order = buildOrderResponse(order);

  return res.status(200).json(order);
};

module.exports.getAllOrders = async (req, res) => {
  if (req.query.accepted_by_me == "true")
    return await getOrdersAcceptedByMe(req, res);
  if (req.query.completed_by_me == "true")
    return await getOrdersCompletedByMe(req, res);

  const newStatusId = await Status.findOne({ name: STATUS.NEW }, "_id");

  const inProcessStatusId = await Status.findOne(
    { name: STATUS.IN_PROCESS },
    "_id"
  );

  // orders in process but not completed and time expired to submit pin
  const inProcessOrders = await Order.find({
    user: { $ne: req.query.user_id },
    status: inProcessStatusId,
    accepted_at: { $lt: Date.now() - 5 * 60 * 1000 },
  });

  await updateOrdersInProcessToNew(inProcessOrders);

  // all orders
  let allOrders = await Order.find({
    user: { $ne: req.query.user_id },
    status: newStatusId,
  })
    .populate({
      path: "item",
      populate: "counter tod",
    })
    .populate({
      path: "status custom_item.tod",
    })
    .sort({ ordered_at: -1 });

  console.log(allOrders);

  allOrders = buildOrderResponse(allOrders);

  return res.status(200).json(allOrders);
};

const getOrdersAcceptedByMe = async (req, res) => {
  const inProcessStatusId = await Status.findOne(
    { name: STATUS.IN_PROCESS },
    "_id"
  );

  let ordersAcceptedByMe = await Order.find({
    user: { $ne: req.query.user_id },
    status: inProcessStatusId,
    accepted_by: req.query.user_id,
    accepted_at: { $gt: Date.now() - 5 * 60 * 1000 },
  })
    .populate({
      path: "item",
      populate: "counter tod",
    })
    .populate({
      path: "status custom_item.tod",
    })
    .sort({ ordered_at: -1 });

  ordersAcceptedByMe = buildOrderResponse(ordersAcceptedByMe);

  res.status(200).json(ordersAcceptedByMe);
};

const getOrdersCompletedByMe = async (req, res) => {
  const CompletedStatusId = await Status.findOne(
    { name: STATUS.COMPLETED },
    "_id"
  );

  let ordersCompletedByMe = await Order.find({
    user: { $ne: req.query.user_id },
    status: CompletedStatusId,
    accepted_by: req.query.user_id,
  })
    .populate({
      path: "item",
      populate: "counter tod",
    })
    .populate({
      path: "status custom_item.tod",
    })
    .sort({ ordered_at: -1 });

  ordersCompletedByMe = buildOrderResponse(ordersCompletedByMe);

  res.status(200).json(ordersCompletedByMe);
};

module.exports.getMyOrders = async (req, res) => {
  let myOrders = await Order.find({
    user: req.query.user_id,
  })
    .populate({
      path: "item",
      populate: "counter tod",
    })
    .populate({
      path: "status custom_item.tod",
    })
    .sort({ ordered_at: -1 });

  myOrders = buildOrderResponse(myOrders);

  return res.status(200).json(myOrders);
};

module.exports.newOrder = async (req, res) => {
  console.log(req.body);
  if (!req.body.quantity) req.body.quantity = 1;

  const newStatusId = await Status.findOne({ name: STATUS.NEW }, "_id");

  if (req.body.is_custom) {
    for (let i = 0; i < req.body.quantity; i++) {
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
    }
    return res.status(201).json("order created");
  }

  for (let i = 0; i < req.body.quantity; i++) {
    const order = new Order({
      user: req.body.user_id,
      item: req.body.item_id,
      status: newStatusId,
    });
    await order.save();
  }
  return res.status(201).json("order created");
};

module.exports.acceptOrder = async (req, res) => {
  const inProcessStatusId = await Status.findOne(
    { name: STATUS.IN_PROCESS },
    "_id"
  );

  // console.log(req.body.order_id);

  const order = await Order.findOne({
    _id: req.body.order_id,
  }).populate("status");

  if (order.status.name === STATUS.NEW) {
    order.status = inProcessStatusId;
    order.accepted_at = Date.now();
    order.accepted_by = req.body.user_id;
  } else {
    return res.status(409).json({ message: "Invalid order" });
  }

  await order.save();

  return res.status(200).json({ message: "Order accepted" });
};

module.exports.completeOrder = async (req, res) => {
  const completedStatusId = await Status.findOne(
    { name: STATUS.COMPLETED },
    "_id"
  );

  const order = await Order.findOne({
    _id: req.body.order_id,
  }).populate("status");

  if (order.status.name === STATUS.IN_PROCESS) {
    order.status = completedStatusId;
    order.order_pin = req.body.pin;
    order.completed_at = Date.now();
  } else {
    return res.status(409).json({ message: "Invalid order" });
  }

  await order.save();

  return res.status(200).json({ message: "Order completed" });
};

module.exports.deleteOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.body.order_id,
    user: req.body.user_id,
  }).populate("status");

  if (!order) return res.status(404).send({ message: "Order not found" });
  if (order.status !== STATUS.NEW)
    return res.status(400).send({ message: "Order cannot be deleted" });

  await Order.findByIdAndDelete(req.body.order_id);

  return res.status(200).json({ message: "Order deleted successfully" });
};

async function updateOrdersInProcessToNew(orderIds) {
  const newStatusId = await Status.findOne({ name: "new" });
  await Order.updateMany({ _id: orderIds }, { status: newStatusId });
}
