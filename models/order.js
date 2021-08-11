const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  order_id: String,
  status: String,
  order_amount: Number,
  order_tax_amount: Number,
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
  },
  started_at: Date,
  completed_at: Date,
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.order_amount = returnedObject.order_amount / 100;
    returnedObject.order_tax_amount = returnedObject.order_tax_amount / 100;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

orderSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.order_amount = returnedObject.order_amount / 100;
    returnedObject.order_tax_amount = returnedObject.order_tax_amount / 100;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
