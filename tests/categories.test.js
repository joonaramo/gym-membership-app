const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./categories_helper');
const usersHelper = require('./users_helper');

let adminToken;
let nonAdminToken;

beforeEach(async () => {
  await helper.initializeCategories();
  await usersHelper.initializeUsers();
  const users = await usersHelper.usersInDb();

  const adminUser = users[0];
  adminToken = await usersHelper.loginUser(adminUser);
  const nonAdminUser = users[1];
  nonAdminToken = await usersHelper.loginUser(nonAdminUser);
});

describe('GET /api/categories', () => {
  test('unauthorized user can get list of categories', async () => {
    const response = await api
      .get('/api/categories')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialCategories.length);
  });
});

describe('GET /api/categories/:id', () => {
  test('unauthorized user can get a single category', async () => {
    const categories = await helper.categoriesInDb();
    const singleCategory = categories[0];
    const response = await api
      .get(`/api/categories/${singleCategory.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(singleCategory)));
  });
});

describe('POST /api/categories', () => {
  let categoryData;
  beforeEach(async () => {
    categoryData = {
      name: 'Test Category 5',
      description: 'Category for testing',
    };
  });
  test('unauthorized user can not create new category and receives 401', async () => {
    await api
      .post('/api/categories')
      .send(categoryData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not create new category and receives 403', async () => {
    await api
      .post('/api/categories')
      .send(categoryData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  describe('authorized admin user', () => {
    test('can create a new category with valid data', async () => {
      const response = await api
        .post('/api/categories')
        .send(categoryData)
        .set('Authorization', `bearer ${adminToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect({
        name: response.body.name,
        description: response.body.description,
      }).toEqual(categoryData);
    });
    test('can not create a new category with missing fields and receives 400', async () => {
      await api
        .post('/api/categories')
        .send({ membership_length: 5, unit_price: 0 })
        .set('Authorization', `bearer ${adminToken}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });
});

describe('PUT /api/categories/:id', () => {
  let categoryData;
  let singleCategory;
  beforeEach(async () => {
    const categories = await helper.categoriesInDb();
    singleCategory = categories[0];
    categoryData = {
      name: 'Test Category 5',
      description: 'Category for testing',
    };
  });
  test('unauthorized user can not update a category and receives 401', async () => {
    await api
      .put(`/api/categories/${singleCategory.id}`)
      .send(categoryData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not update a category and receives 403', async () => {
    await api
      .put(`/api/categories/${singleCategory.id}`)
      .send(categoryData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can update a category', async () => {
    const response = await api
      .put(`/api/categories/${singleCategory.id}`)
      .send(categoryData)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect({
      name: response.body.name,
      description: response.body.description,
    }).toEqual(categoryData);
  });
});

describe('DELETE /api/categories/:id', () => {
  let singleCategory;
  beforeEach(async () => {
    const categories = await helper.categoriesInDb();
    singleCategory = categories[0];
  });
  test('unauthorized user can not delete a category and receives 401', async () => {
    await api
      .delete(`/api/categories/${singleCategory.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not delete a category and receives 403', async () => {
    await api
      .delete(`/api/categories/${singleCategory.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can delete a category', async () => {
    await api
      .delete(`/api/categories/${singleCategory.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
