const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders");

router.route("/all").get(orders.getAllOrders);
router.route("/my").get(orders.getMyOrders);
router.route("/[id]").get(orders.getSingleOrder);
router.route("/").post(orders.newOrder).delete(orders.deleteOrder);
router.route("/accept").post(orders.acceptOrder);
router.route("/complete").post(orders.completeOrder);

module.exports = router;
