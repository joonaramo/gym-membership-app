const config = require('../../utils/config');
const router = require('express').Router();
const Order = require('../../models/order');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user');
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
