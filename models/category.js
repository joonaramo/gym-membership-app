const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  sub_categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

categorySchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

function autoPopulateSubCategories(next) {
  this.populate('sub_categories');
  this.populate('products');
  next();
}

categorySchema
  .pre('findOne', autoPopulateSubCategories)
  .pre('find', autoPopulateSubCategories);

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
