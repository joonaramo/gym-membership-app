const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema({
  type: {
    type: String,
    default: 'physical',
  },
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  most_popular: {
    type: Boolean,
    default: false,
  },
  membership_length: {
    type: Number,
  },
  quantity_unit: {
    type: String,
    default: 'pcs',
  },
  unit_price: {
    type: Number,
    required: true,
  },
  tax_rate: {
    type: Number,
    required: true,
  },
  valid_coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
    },
  ],
  times_purchased: {
    type: Number,
    default: 0,
  },
});

productSchema.plugin(uniqueValidator);

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.unit_price = returnedObject.unit_price / 100;
    returnedObject.tax_rate = returnedObject.tax_rate / 100;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
