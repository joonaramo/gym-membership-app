const Product = require('../models/product');
const { initializeCategories, categoriesInDb } = require('./categories_helper');

const initialProducts = [
  {
    reference: 'TEST-01',
    name: 'Test Product 1',
    membership_length: 1,
    unit_price: 25,
    tax_rate: 24,
  },
  {
    reference: 'TEST-02',
    name: 'Test Product 2',
    membership_length: 2,
    unit_price: 25,
    tax_rate: 24,
  },
  {
    reference: 'TEST-03',
    name: 'Test Product 3',
    membership_length: 3,
    unit_price: 25,
    tax_rate: 24,
  },
  {
    reference: 'TEST-04',
    name: 'Test Product 4',
    membership_length: 4,
    unit_price: 25,
    tax_rate: 24,
  },
];

const initializeProducts = async () => {
  await Product.deleteMany({});
  await initializeCategories();
  const categories = await categoriesInDb();
  const category = categories[0];
  const productsWithCategory = initialProducts.map((product) => {
    return { ...product, category: category.id };
  });
  await Product.insertMany(productsWithCategory);
};

const productsInDb = async () => {
  const products = await Product.find({});
  return products.map((p) => p.toJSON());
};

module.exports = {
  initialProducts,
  initializeProducts,
  productsInDb,
};
