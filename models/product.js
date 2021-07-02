const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  type: {
    type: String,
    default: 'physical',
  },
  reference: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
