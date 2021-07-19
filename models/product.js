const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  membership_length: {
    type: Number,
    required: true,
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
  times_purchased: {
    type: Number,
    default: 0,
  },
});

productSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
