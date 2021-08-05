const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const couponSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
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

couponSchema.plugin(uniqueValidator);

couponSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.value = returnedObject.value / 100;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

couponSchema.plugin(mongoosePaginate);

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
