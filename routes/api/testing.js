const router = require('express').Router();
const Category = require('../../models/category');
const Coupon = require('../../models/coupon');
const Membership = require('../../models/membership');
const Order = require('../../models/order');
const Product = require('../../models/product');
const Settings = require('../../models/settings');
const User = require('../../models/user');

router.post('/reset', async (req, res) => {
  await Category.deleteMany({});
  await Coupon.deleteMany({});
  await Membership.deleteMany({});
  await Order.deleteMany({});
  await Product.deleteMany({});
  await Settings.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;
