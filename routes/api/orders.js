const config = require('../../utils/config');
const router = require('express').Router();

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
      push: 'http://localhost:3000/api/push?order_id={checkout.order.id}',
    },
  };

  const initialOrderLines = {
    type: 'physical',
    reference: 'GYM-01',
    name: '1 Month Gym Membership',
    quantity: 1,
    quantity_unit: 'pcs',
    unit_price: 4000,
    tax_rate: 1000,
  };

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

module.exports = router;
