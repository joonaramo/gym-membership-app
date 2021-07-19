const config = require('../../utils/config');
const router = require('express').Router();
const axios = require('axios');
const Order = require('../../models/order');
const Membership = require('../../models/membership');
const User = require('../../models/user');
const { checkAuth } = require('../../utils/middleware');
const Product = require('../../models/product');
const Coupon = require('../../models/coupon');

const axiosConfig = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      `PK41418_c00c4f82c394:uE5dXrHltcAT5Gi7`
    ).toString('base64')}`,
    'Content-Type': 'application/json',
  },
};

router.post('/', checkAuth, async (req, res, next) => {
  const defaultData = {
    purchase_country: 'FI',
    purchase_currency: 'EUR',
    locale: 'fi-FI',
    merchant_reference2: req.user.id,
    merchant_urls: {
      terms: 'http://localhost:3000/terms',
      checkout: 'http://localhost:3000/checkout',
      confirmation: 'http://localhost:3000/confirmation',
      push: 'http://localhost:5000/api/klarna/confirm/{checkout.order.id}',
    },
  };

  let discountAmount = 0;

  if (req.body.coupon) {
    const coupon = await Coupon.findOne({ code: req.body.coupon });
    discountAmount = coupon.value * 100;
  }

  const calculateOrderLinesValues = (orderLines) => {
    let amount = 0,
      taxAmount = 0;
    const currentOrderLines = orderLines.filter(
      (orderLine) => orderLine.quantity
    );

    currentOrderLines.forEach((orderLine) => {
      orderLine['total_amount'] =
        orderLine.quantity * orderLine.unit_price - discountAmount;
      orderLine['total_tax_amount'] =
        orderLine['total_amount'] -
        (orderLine['total_amount'] * 10000) / (10000 + orderLine.tax_rate);
      orderLine['total_discount_amount'] = discountAmount;

      amount += orderLine['total_amount'];
      taxAmount += orderLine['total_tax_amount'];
    });

    return {
      amount,
      taxAmount,
      orderLines: currentOrderLines,
    };
  };

  let selectedProducts = await Product.find({
    _id: { $in: req.body.products },
  });

  selectedProducts = selectedProducts.map((product, i) => {
    return {
      type: product.type,
      quantity_unit: product.quantity_unit,
      reference: product.reference,
      name: product.name,
      unit_price: product.unit_price,
      tax_rate: product.tax_rate,
      quantity: req.body.quantities[i],
      merchant_data: product._id,
    };
  });

  const { amount, taxAmount, orderLines } =
    calculateOrderLinesValues(selectedProducts);

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
    console.log(err);
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
    const {
      data: {
        order_id,
        status,
        order_lines,
        order_amount,
        order_tax_amount,
        started_at,
        completed_at,
        merchant_reference2,
        html_snippet,
      },
    } = await axios.get(
      `${config.KLARNA_API_URL}/checkout/v3/orders/${req.params.order_id}`,
      axiosConfig
    );

    // Check if checkout is in completed-state
    if (status !== 'checkout_complete') {
      return res.status(400).json({ error: 'Checkout not completed' });
    }

    // Acknowledge the order
    try {
      await axios.post(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${req.params.order_id}/acknowledge`,
        {},
        axiosConfig
      );
    } catch (err) {
      console.log(err);
    }

    // Check if order has already been saved to DB
    let order;
    order = await Order.findOne({ order_id: req.params.order_id });
    if (order) {
      return res.status(400).json({ error: 'Order is already completed' });
    }

    // Find purchased products and append their times purchased value
    order_lines.map(async (line) => {
      const product = await Product.findById(line.merchant_data);
      product.times_purchased++;
      await product.save();
    });
    let products = [];
    order_lines.forEach((line) => {
      products.push(line.merchant_data);
    });

    // Save order to DB
    order = new Order({
      user: merchant_reference2,
      order_id,
      status,
      products,
      order_amount,
      order_tax_amount,
      started_at,
      completed_at,
    });
    const newOrder = await order.save();

    // Set Order ID as merchant reference to Klarna
    try {
      await axios.patch(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${order_id}/merchant-references`,
        {
          merchant_reference1: newOrder._id,
        },
        axiosConfig
      );
    } catch (err) {
      console.log(err);
    }

    // Save membership to DB, assign membership id and order id to the user
    const date = new Date();
    const membership = new Membership({
      user: merchant_reference2,
      order: newOrder._id,
      end_date: date.setMonth(date.getMonth() + 1),
    });
    const newMembership = await membership.save();
    const user = await User.findById(merchant_reference2);
    user.memberships = user.memberships.concat(newMembership._id);
    user.orders = user.orders.concat(newOrder._id);
    await user.save();
    res.json({ html_snippet });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
