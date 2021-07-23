const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  orders: [
    {
      type: 'String',
    },
  ],
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
