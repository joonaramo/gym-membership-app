const config = require('../../utils/config');
const router = require('express').Router();
const Order = require('../../models/order');
const axios = require('axios');

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
  const getKlarnaOrder = async (order_id) => {
    try {
      const { data } = await axios.get(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${order_id}`,
        config.AXIOS_CONFIG
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products');
    const klarna = await getKlarnaOrder(order.order_id);
    res.json({ ...order.toObject(), klarna });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
