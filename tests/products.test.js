const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./products_helper');
const usersHelper = require('./users_helper');
const Category = require('../models/category');

let adminToken;
let nonAdminToken;

beforeEach(async () => {
  await helper.initializeProducts();
  await usersHelper.initializeUsers();
  const users = await usersHelper.usersInDb();

  const adminUser = users[0];
  adminToken = await usersHelper.loginUser(adminUser);
  const nonAdminUser = users[1];
  nonAdminToken = await usersHelper.loginUser(nonAdminUser);
});

describe('GET /api/products', () => {
  test('unauthorized user can get list of products', async () => {
    const response = await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialProducts.length);
  });
});

describe('GET /api/products/:id', () => {
  test('unauthorized user can get a single product', async () => {
    const products = await helper.productsInDb();
    const singleProduct = products[0];
    const response = await api
      .get(`/api/products/${singleProduct.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(singleProduct)));
  });
});

describe('POST /api/products', () => {
  let productData;
  beforeEach(async () => {
    const category = await Category.findOne();
    productData = {
      reference: 'TEST-05',
      name: 'Test Product 5',
      category: category.id,
      membership_length: 5,
      unit_price: 50,
      tax_rate: 24,
    };
  });
  test('unauthorized user can not create new product and receives 401', async () => {
    await api
      .post('/api/products')
      .send(productData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not create new product and receives 403', async () => {
    await api
      .post('/api/products')
      .send(productData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  describe('authorized admin user', () => {
    test('can create a new product with valid data', async () => {
      const response = await api
        .post('/api/products')
        .send(productData)
        .set('Authorization', `bearer ${adminToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect({
        reference: response.body.reference,
        name: response.body.name,
        category: response.body.category,
        membership_length: response.body.membership_length,
        unit_price: response.body.unit_price,
        tax_rate: response.body.tax_rate,
      }).toEqual(productData);
    });
    test('can not create a new product with missing fields and receives 400', async () => {
      await api
        .post('/api/products')
        .send({ membership_length: 5, unit_price: 0 })
        .set('Authorization', `bearer ${adminToken}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });
});

describe('PUT /api/products/:id', () => {
  let productData;
  let singleProduct;
  beforeEach(async () => {
    const category = await Category.findOne();
    const products = await helper.productsInDb();
    singleProduct = products[0];
    productData = {
      reference: 'TEST-06',
      name: 'Test Product 6',
      type: 'physical',
      category: category.id,
      quantity_unit: 'pcs',
      times_purchased: 0,
      membership_length: 6,
      unit_price: 50,
      tax_rate: 24,
    };
  });
  test('unauthorized user can not update a product and receives 401', async () => {
    await api
      .put(`/api/products/${singleProduct.id}`)
      .send(productData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not update a product and receives 403', async () => {
    await api
      .put(`/api/products/${singleProduct.id}`)
      .send(productData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can update a product', async () => {
    const response = await api
      .put(`/api/products/${singleProduct.id}`)
      .send(productData)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect({
      reference: response.body.reference,
      name: response.body.name,
      quantity_unit: response.body.quantity_unit,
      type: response.body.type,
      times_purchased: response.body.times_purchased,
      category: response.body.category,
      membership_length: response.body.membership_length,
      unit_price: response.body.unit_price,
      tax_rate: response.body.tax_rate,
    }).toEqual(productData);
  });
});

describe('DELETE /api/products/:id', () => {
  let singleProduct;
  beforeEach(async () => {
    const products = await helper.productsInDb();
    singleProduct = products[0];
  });
  test('unauthorized user can not delete a product and receives 401', async () => {
    await api
      .delete(`/api/products/${singleProduct.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not delete a product and receives 403', async () => {
    await api
      .delete(`/api/products/${singleProduct.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can delete a product', async () => {
    await api
      .delete(`/api/products/${singleProduct.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
