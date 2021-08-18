const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const helper = require('./coupons_helper');
const usersHelper = require('./users_helper');

let adminToken;
let nonAdminToken;

beforeEach(async () => {
  await helper.initializeCoupons();
  await usersHelper.initializeUsers();

  const users = await usersHelper.usersInDb();
  const adminUser = users[0];
  adminToken = await usersHelper.loginUser(adminUser);
  const nonAdminUser = users[1];
  nonAdminToken = await usersHelper.loginUser(nonAdminUser);
});

describe('GET /api/coupons', () => {
  test('unauthorized user can not get list of coupons and receives 401', async () => {
    await api
      .get('/api/coupons')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not get list of coupons and receives 403', async () => {
    await api
      .get('/api/coupons')
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can get list of coupons', async () => {
    const response = await api
      .get('/api/coupons')
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialCoupons.length);
  });
});

describe('GET /api/coupons/:id', () => {
  let singleCoupon;
  beforeEach(async () => {
    const coupons = await helper.couponsInDb();
    singleCoupon = coupons[0];
  });
  test('unauthorized user can not get a single coupon and receives 401', async () => {
    const response = await api
      .get(`/api/coupons/${singleCoupon.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not get a single coupon and receives 403', async () => {
    await api
      .get(`/api/coupons/${singleCoupon.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can get a single coupon', async () => {
    const response = await api
      .get(`/api/coupons/${singleCoupon.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(singleCoupon)));
  });
});

describe('POST /api/coupons', () => {
  let couponData;
  beforeEach(async () => {
    couponData = {
      code: 'testcoupon5',
      value: 50,
    };
  });
  test('unauthorized user can not create new coupon and receives 401', async () => {
    await api
      .post('/api/coupons')
      .send(couponData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not create new coupon and receives 403', async () => {
    await api
      .post('/api/coupons')
      .send(couponData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  describe('authorized admin user', () => {
    test('can create a new coupon with valid data', async () => {
      const response = await api
        .post('/api/coupons')
        .send(couponData)
        .set('Authorization', `bearer ${adminToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect({
        code: response.body.code,
        value: response.body.value,
      }).toEqual(couponData);
    });
    test('can not create a new coupon with missing fields and receives 400', async () => {
      await api
        .post('/api/coupons')
        .send({ membership_length: 5, unit_price: 0 })
        .set('Authorization', `bearer ${adminToken}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });
});

describe('PUT /api/coupons/:id', () => {
  let couponData;
  let singleCoupon;
  beforeEach(async () => {
    const coupons = await helper.couponsInDb();
    singleCoupon = coupons[0];
    couponData = {
      code: 'testcoupon5',
      value: 50,
      active: false,
    };
  });
  test('unauthorized user can not update a coupon and receives 401', async () => {
    await api
      .put(`/api/coupons/${singleCoupon.id}`)
      .send(couponData)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not update a coupon and receives 403', async () => {
    await api
      .put(`/api/coupons/${singleCoupon.id}`)
      .send(couponData)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can update a coupon', async () => {
    const response = await api
      .put(`/api/coupons/${singleCoupon.id}`)
      .send(couponData)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect({
      code: response.body.code,
      value: response.body.value,
      active: response.body.active,
    }).toEqual(couponData);
  });
});

describe('DELETE /api/coupons/:id', () => {
  let singleCoupon;
  beforeEach(async () => {
    const coupons = await helper.couponsInDb();
    singleCoupon = coupons[0];
  });
  test('unauthorized user can not delete a coupon and receives 401', async () => {
    await api
      .delete(`/api/coupons/${singleCoupon.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized non-admin user can not delete a coupon and receives 403', async () => {
    await api
      .delete(`/api/coupons/${singleCoupon.id}`)
      .set('Authorization', `bearer ${nonAdminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });
  test('authorized admin user can delete a coupon', async () => {
    await api
      .delete(`/api/coupons/${singleCoupon.id}`)
      .set('Authorization', `bearer ${adminToken}`)
      .expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
