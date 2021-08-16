const config = require('../../utils/config');
const router = require('express').Router();
const axios = require('axios');
const Order = require('../../models/order');
const Membership = require('../../models/membership');
const User = require('../../models/user');
const { checkAuth, checkAdmin } = require('../../utils/middleware');
const Product = require('../../models/product');
const Coupon = require('../../models/coupon');

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

  const calculateOrderLinesValues = async (orderLines) => {
    let amount = 0,
      taxAmount = 0;
    const currentOrderLines = orderLines.filter(
      (orderLine) => orderLine.quantity
    );

    let coupon;

    if (req.body.coupon) {
      coupon = await Coupon.findOne({ code: req.body.coupon });
    }

    await Promise.all(
      currentOrderLines.map(async (orderLine) => {
        let discountApplied = false;
        let discountAmount = 0;
        if (
          coupon &&
          orderLine.valid_coupons.includes(coupon._id) &&
          !discountApplied
        ) {
          discountAmount = coupon.value;
          discountApplied = true;
        }
        console.log(discountAmount, 'discount');
        orderLine['total_amount'] =
          orderLine.quantity * orderLine.unit_price - discountAmount;
        orderLine['total_tax_amount'] =
          orderLine['total_amount'] -
          (orderLine['total_amount'] * 10000) / (10000 + orderLine.tax_rate);
        orderLine['total_discount_amount'] = discountAmount;

        amount += orderLine['total_amount'];
        taxAmount += orderLine['total_tax_amount'];
      })
    );

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
      valid_coupons: product.valid_coupons,
    };
  });

  const { amount, taxAmount, orderLines } = await calculateOrderLinesValues(
    selectedProducts
  );

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
      config.AXIOS_CONFIG
    );
    if (req.body.coupon) {
      let coupon = await Coupon.findOne({ code: req.body.coupon });
      coupon.orders.unshift(data.order_id);
      await coupon.save();
    }
    res.json(data);
  } catch (err) {
    console.log(err.response.data);
    next(err);
  }
});

router.get('/:id', checkAdmin, async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `${config.KLARNA_API_URL}/checkout/v3/orders/${req.params.id}`,
      config.AXIOS_CONFIG
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
      config.AXIOS_CONFIG
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
        config.AXIOS_CONFIG
      );
    } catch (err) {
      console.log(err);
    }

    // Check if order has already been saved to DB
    let order;
    order = await Order.findOne({ order_id: req.params.order_id });
    if (order) {
      return res.json({ html_snippet });
    }

    // Change order lines to products for our DB
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
    const user = await User.findById(merchant_reference2);
    user.orders.push(newOrder._id);
    await user.save();

    // Set Order ID as merchant reference to Klarna
    try {
      await axios.patch(
        `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${order_id}/merchant-references`,
        {
          merchant_reference1: newOrder._id,
        },
        config.AXIOS_CONFIG
      );
    } catch (err) {
      console.log(err);
    }

    // Find purchased products and append their times purchased value and get membership length

    order_lines.forEach(async (line) => {
      const date = new Date();

      const product = await Product.findById(line.merchant_data);
      product.times_purchased++;
      await product.save();

      // Save membership to DB, assign membership id to the user
      const user = await User.findById(merchant_reference2);
      const membership = new Membership({
        user: merchant_reference2,
        order: newOrder._id,
        end_date: date.setMonth(date.getMonth() + product.membership_length),
      });
      const newMembership = await membership.save();
      user.memberships.push(newMembership._id);
      await user.save();
    });

    res.json({ html_snippet });
  } catch (err) {
    next(err);
  }
});

router.post('/capture/:id', checkAdmin, async (req, res, next) => {
  try {
    const { order_amount, order_lines } = req.body;
    await axios.post(
      `${config.KLARNA_API_URL}/ordermanagement/v1/orders/${req.params.id}/captures`,
      { captured_amount: order_amount, order_lines },
      config.AXIOS_CONFIG
    );
    const order = await Order.findOne({ order_id: req.params.id });
    order.status = 'order_captured';
    await order.save();
    res.status(201).json({ message: 'Capture created' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
