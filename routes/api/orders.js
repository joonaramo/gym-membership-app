const config = require('../../utils/config');
const router = require('express').Router();
const Order = require('../../models/order');

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
        populate: 'user',
      };
      const orders = await Order.paginate({}, options);
      return res.json(orders);
    }
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products');
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
