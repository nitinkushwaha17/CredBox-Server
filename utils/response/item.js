module.exports.buildItemResponse = (items) => {
  const build = (item) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
    };
  };

  if (!(items instanceof Array)) {
    return build(items);
  }

  const modifiedItems = [];

  items.forEach((item) => {
    modifiedItems.push(build(item));
  });

  return modifiedItems;
};
