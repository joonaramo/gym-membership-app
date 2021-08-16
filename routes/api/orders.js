const config = require('../../utils/config');
const router = require('express').Router();
const Order = require('../../models/order');
const axios = require('axios');

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

router.get('/', async (req, res, next) => {
  try {
    const { page, limit, status } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
        populate: 'user',
        sort: { completed_at: 'desc' },
      };
      const orders = await Order.paginate(status && { status }, options);
      const ordersWithKlarna = {
        ...orders,
        docs: await Promise.all(
          orders.docs.map(async (order) => {
            const klarna = await getKlarnaOrder(order.order_id);
            return {
              ...order.toObject(),
              klarna,
            };
          })
        ),
      };
      return res.json(ordersWithKlarna);
    }
    const orders = await Order.find().populate('user');
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
    const klarna = await getKlarnaOrder(order.order_id);
    res.json({ ...order.toObject(), klarna });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.status !== 'order_captured') {
      await axios.post(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${order.order_id}/cancel`,
        {},
        config.AXIOS_CONFIG
      );
    } else {
      const klarna = await getKlarnaOrder(order.order_id);
      await axios.post(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${order.order_id}/refunds`,
        {
          refunded_amount: klarna.order_amount,
          order_lines: klarna.order_lines,
        },
        config.AXIOS_CONFIG
      );
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
