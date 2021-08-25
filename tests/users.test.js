const { format } = require('date-fns');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./users_helper');

let adminToken;
let nonAdminToken;

beforeEach(async () => {
  await helper.initializeUsers();

  const users = await helper.usersInDb();
  const adminUser = users[0];
  adminToken = await helper.loginUser(adminUser);
  const nonAdminUser = users[1];
  nonAdminToken = await helper.loginUser(nonAdminUser);
});

describe('GET /api/users', () => {
  test('unauthorized user can not get list of users and receives 401', async () => {
    await api
      .get('/api/users')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not get list of users and receives 403', async () => {
    await api
      .get('/api/users')
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can get list of users', async () => {
    const response = await api
      .get('/api/users')
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
});

describe('GET /api/users/:id', () => {
  let singleUser;
  beforeEach(async () => {
    const users = await helper.usersInDb();
    singleUser = users[0];
  });
  test('unauthorized user can not get a single user and receives 401', async () => {
    await api
      .get(`/api/users/${singleUser.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not get a single user and receives 403', async () => {
    await api
      .get(`/api/users/${singleUser.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can get a single user', async () => {
    const response = await api
      .get(`/api/users/${singleUser.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(singleUser)));
  });
});

describe('PATCH /api/users/:id', () => {
  let userData;
  let singleUser;
  beforeEach(async () => {
    const users = await helper.usersInDb();
    singleUser = users[0];
    userData = {
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'Test',
      phone_number: '1234567890',
      street_address: '123 Test Street',
      postal_code: 12345,
      city: 'Test City',
      birth_date: new Date(format(new Date(), 'yyyy-MM-dd')),
    };
  });
  test('unauthorized user can not update a user and receives 401', async () => {
    await api
      .patch(`/api/users/${singleUser.id}`)
      .send(userData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not update a user and receives 403', async () => {
    await api
      .patch(`/api/users/${singleUser.id}`)
      .send(userData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can update a user', async () => {
    const response = await api
      .patch(`/api/users/${singleUser.id}`)
      .send(userData)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect({
      email: response.body.email,
      first_name: response.body.first_name,
      last_name: response.body.last_name,
      phone_number: response.body.phone_number,
      street_address: response.body.street_address,
      postal_code: response.body.postal_code,
      city: response.body.city,
      birth_date: new Date(response.body.birth_date),
    }).toEqual(userData);
  });
});

describe('DELETE /api/users/:id', () => {
  let singleUser;
  beforeEach(async () => {
    const users = await helper.usersInDb();
    singleUser = users[0];
  });
  test('unauthorized user can not delete a user and receives 401', async () => {
    await api
      .delete(`/api/users/${singleUser.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not delete a user and receives 403', async () => {
    await api
      .delete(`/api/users/${singleUser.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can delete a user', async () => {
    await api
      .delete(`/api/users/${singleUser.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
