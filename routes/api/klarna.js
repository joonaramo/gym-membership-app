const config = require('../../utils/config');
const router = require('express').Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Order = require('../../models/order');
const Membership = require('../../models/membership');
const User = require('../../models/user');

const axiosConfig = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      `PK41418_c00c4f82c394:uE5dXrHltcAT5Gi7`
    ).toString('base64')}`,
    'Content-Type': 'application/json',
  },
};

router.post('/', async (req, res, next) => {
  const defaultData = {
    purchase_country: 'FI',
    purchase_currency: 'EUR',
    locale: 'fi-FI',
    merchant_urls: {
      terms: 'http://localhost:3000/terms',
      checkout: 'http://localhost:3000?order_id={checkout.order.id}',
      confirmation:
        'http://localhost:3000/confirmation?order_id={checkout.order.id}',
      push: 'http://localhost:5000/api/klarna/confirm/{checkout.order.id}',
    },
  };

  const initialOrderLines = [
    {
      type: 'physical',
      reference: 'GYM-01',
      name: '1 Month Gym Membership',
      quantity: 1,
      quantity_unit: 'pcs',
      unit_price: 4000,
      tax_rate: 1000,
    },
  ];

  const calculateOrderLinesValues = (orderLines) => {
    let amount = 0,
      taxAmount = 0;
    const currentOrderLines = orderLines.filter(
      (orderLine) => orderLine.quantity
    );

    currentOrderLines.forEach((orderLine) => {
      orderLine['total_amount'] = orderLine.quantity * orderLine.unit_price;
      orderLine['total_tax_amount'] =
        orderLine['total_amount'] -
        (orderLine['total_amount'] * 10000) / (10000 + orderLine.tax_rate);
      orderLine['total_discount_amount'] = 0;

      amount += orderLine['total_amount'];
      taxAmount += orderLine['total_tax_amount'];
    });

    return {
      amount,
      taxAmount,
      orderLines: currentOrderLines,
    };
  };

  const { amount, taxAmount, orderLines } =
    calculateOrderLinesValues(initialOrderLines);

  const postData = {
    ...defaultData,
    order_amount: amount,
    order_tax_amount: taxAmount,
    order_lines: orderLines,
  };

  try {
    const { data } = await axios.post(
      `${config.KLARNA_API_URL}/checkout/v3/orders`,
      postData,
      axiosConfig
    );

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `${config.KLARNA_API_URL}/checkout/v3/orders/${req.params.id}`,
      axiosConfig
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/confirm/:order_id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);
    const {
      data: {
        order_id,
        status,
        order_amount,
        order_tax_amount,
        started_at,
        completed_at,
      },
    } = await axios.get(
      `${config.KLARNA_API_URL}/checkout/v3/orders/${req.params.order_id}`,
      axiosConfig
    );

    // Acknowledge the order
    try {
      await axios.post(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${req.params.order_id}/acknowledge`,
        {},
        axiosConfig
      );
    } catch (error) {
      console.log(error);
    }

    // Check if checkout is in completed-state
    if (status !== 'checkout_complete') {
      return res.status(400).json({ error: 'Checkout not completed' });
    }

    // Check if order has already been saved to DB
    let order;
    order = await Order.findOne({ order_id: req.params.order_id });
    if (order) {
      return res.status(400).json({ error: 'Order is already completed' });
    }

    // Save to DB
    order = new Order({
      user: decodedToken.user.id,
      order_id,
      status,
      order_amount,
      order_tax_amount,
      started_at,
      completed_at,
    });
    const newOrder = await order.save();
    const date = new Date();
    const membership = new Membership({
      user: decodedToken.user.id,
      order: newOrder._id,
      end_date: date.setMonth(date.getMonth() + 1),
    });
    const newMembership = await membership.save();
    const user = await User.findById(decodedToken.user.id);
    user.memberships = user.memberships.concat(newMembership._id);
    user.orders = user.orders.concat(newOrder._id);
    await user.save();
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
