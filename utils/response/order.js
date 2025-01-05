module.exports.buildOrderResponse = (orders) => {
  const build = (order) => {
    return {
      id: order._id,
      status: order.status.name,
      item: order.is_custom ? order.custom_item.name : order.item.name,
      price: order.is_custom ? order.custom_item.price : order.item.price,
      counter: order.is_custom
        ? order.custom_item.counter_name
        : order.item.counter.name,
      tod: order.is_custom ? order.custom_item.tod.name : order.item.tod.name,
    };
  };

  if (!(orders instanceof Array)) {
    return build(orders);
  }

  const modifiedOrders = [];

  orders.forEach((order) => {
    modifiedOrders.push(build(order));
  });

  return modifiedOrders;
};
