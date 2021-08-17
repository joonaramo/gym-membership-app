const Product = require('../models/product');
const Category = require('../models/category');

const initializeCategory = async () => {
  await Category.deleteMany({});
  const newCategory = new Category({
    name: 'Test Category 1',
    description: 'This is category for testing',
  });
  const category = await newCategory.save();
  return category;
};

const productsInDb = async () => {
  const products = await Product.find({});
  return products.map((u) => u.toJSON());
};

// const nonExistingId = async () => {
//   const user = new User({
//     email: 'remove@me.com',
//     first_name: 'Remove',
//     last_name: 'Me',
//     phone_number: '10100101',
//     street_address: '1010 Doe Street',
//     postal_code: 101010,
//     city: 'Doe City',
//     birth_date: Date.now(),
//   });
//   await user.save();
//   await user.remove();

//   return user.id.toString();
// };

const initializeProducts = async () => {
  await Product.deleteMany({});
  const category = await initializeCategory();
  const productsWithCategory = initialProducts.map((product) => {
    return { ...product, category };
  });
  await Product.insertMany(productsWithCategory);
};

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

module.exports = {
  initialProducts,
  initializeProducts,
  initializeCategory,
  productsInDb,
};
