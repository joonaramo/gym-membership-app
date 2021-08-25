const { format } = require('date-fns');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./users_helper');

beforeEach(async () => {
  await helper.initializeUsers();
});

describe('POST /api/auth/signup', () => {
  const userData = {
    email: 'test@test.com',
    password: 'test123',
    first_name: 'Test',
    last_name: 'Test',
    phone_number: '1234567890',
    street_address: '123 Test Street',
    postal_code: 12345,
    city: 'Test City',
    birth_date: format(new Date(), 'yyyy-MM-dd'),
  };
  test('signup succeeds with valid data', async () => {
    await api
      .post('/api/auth/signup')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('singup fails with malformed/missing data with 400', async () => {
    await api
      .post('/api/auth/signup')
      .send({ email: 'fail@fail.com', password: 'fail123', first_name: 'fail' })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('singup fails if existing user with given email is found with 400', async () => {
    await api
      .post('/api/auth/signup')
      .send({ ...userData, email: 'jester@test.com' })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('POST /api/auth/login', () => {
  const userData = {
    email: 'jester@test.com',
    password: 'test123',
  };
  test('login succeeds with valid credentials', async () => {
    await api
      .post('/api/auth/login')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('login fails with invalid credentials with 401', async () => {
    await api
      .post('/api/auth/login')
      .send({ email: 'fail@fail.com', password: 'fail123' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('login fails with malformed credentials with 400', async () => {
    await api
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: 'fail123' })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
