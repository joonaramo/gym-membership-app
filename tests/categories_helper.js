const Category = require('../models/category');

const initialCategories = [
  {
    name: 'Test Category 1',
    description: 'This is category for testing',
  },
  {
    name: 'Test Category 2',
    description: 'This is category for testing',
  },
  {
    name: 'Test Category 3',
    description: 'This is category for testing',
  },
  {
    name: 'Test Category 4',
    description: 'This is category for testing',
  },
];

const initializeCategories = async () => {
  await Category.deleteMany({});
  await Category.insertMany(initialCategories);
};

const categoriesInDb = async () => {
  const categories = await Category.find({});
  return categories.map((c) => c.toJSON());
};

module.exports = {
  initialCategories,
  initializeCategories,
  categoriesInDb,
};
