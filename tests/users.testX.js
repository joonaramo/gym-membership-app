// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const bcrypt = require('bcrypt');
// const app = require('../app');

// const api = supertest(app);

// const helper = require('./users_helper');
// const User = require('../models/user');

// let token;
// let rootUser;

// beforeEach(async () => {
//   const users = helper.initialUsers;
//   const usersWithPassword = await Promise.all(
//     users.map(async (user) => {
//       const passwordHash = await bcrypt.hash('test123', 10);
//       return { ...user, passwordHash };
//     })
//   );
//   await User.insertMany(usersWithPassword);
// });

// describe('admin user can', () => {
//   beforeEach(async () => {
//     const users = await helper.usersInDb();
//     const adminUser = users[0];
//     token = await helper.loginUser(adminUser);
//   });
//   test('get list of users', async () => {
//     const response = await api
//       .get('/api/users')
//       .set('Authorization', `bearer ${token}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//     expect(response.body).toHaveLength(helper.initialUsers.length + 1); // include root user
//   });
//   describe('get single user', () => {
//     let singleUser;
//     beforeEach(async () => {
//       const users = await helper.usersInDb();
//       singleUser = users[1];
//     });
//     test('succesfully with correct id', async () => {
//       const response = await api
//         .get(`/api/users/${singleUser.id}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
//       expect(response.body).toEqual(JSON.parse(JSON.stringify(singleUser)));
//     });
//     test('fails with 404 if non existing id', async () => {
//       const validNonexistingId = await helper.nonExistingId();
//       await api
//         .get(`/api/users/${validNonexistingId}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(404);
//     });
//     test('fails with 400 if invalid id', async () => {
//       const invalidId = '5a3d5da59070081a82a3445';
//       await api
//         .get(`/api/users/${invalidId}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(400);
//     });
//   });

//   describe('update single user', () => {
//     let singleUser;
//     let userData;
//     beforeEach(async () => {
//       const users = await helper.usersInDb();
//       singleUser = users[1];
//       userData = {
//         email: singleUser.email,
//         first_name: 'Juliet',
//         last_name: singleUser.last_name,
//         phone_number: singleUser.phone_number,
//         street_address: singleUser.street_address,
//         postal_code: singleUser.postal_code,
//         city: singleUser.city,
//         birth_date: singleUser.birth_date,
//       };
//     });
//     test('succesfully with correct id', async () => {
//       const response = await api
//         .patch(`/api/users/${singleUser.id}`)
//         .send(userData)
//         .set('Authorization', `bearer ${token}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
//       expect(response.body.first_name).toEqual('Juliet');
//     });
//     test('fails with 404 if non existing id', async () => {
//       const validNonexistingId = await helper.nonExistingId();
//       await api
//         .patch(`/api/users/${validNonexistingId}`)
//         .send(userData)
//         .set('Authorization', `bearer ${token}`)
//         .expect(404);
//     });
//     test('fails with 400 if invalid id', async () => {
//       const invalidId = '5a3d5da59070081a82a3445';
//       await api
//         .patch(`/api/users/${invalidId}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(400);
//     });
//   });

//   describe('delete single user', () => {
//     let singleUser;
//     beforeEach(async () => {
//       const users = await helper.usersInDb();
//       singleUser = users[1];
//     });
//     test('succesfully with correct id', async () => {
//       await api
//         .delete(`/api/users/${singleUser.id}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(204);
//     });
//     test('fails with 404 if non existing id', async () => {
//       const validNonexistingId = await helper.nonExistingId();
//       await api
//         .delete(`/api/users/${validNonexistingId}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(404);
//     });
//     test('fails with 400 if invalid id', async () => {
//       const invalidId = '5a3d5da59070081a82a3445';
//       await api
//         .delete(`/api/users/${invalidId}`)
//         .set('Authorization', `bearer ${token}`)
//         .expect(400);
//     });
//   });
// });

// describe('logged in user can', () => {
//   let nonAdminUser;
//   let nonAdminToken;
//   beforeEach(async () => {
//     const users = await helper.usersInDb();
//     nonAdminUser = users[1];
//     nonAdminToken = await helper.loginUser(nonAdminUser);
//   });
//   test('not get list of users', async () => {
//     await api
//       .get('/api/users')
//       .set('Authorization', `bearer ${nonAdminToken}`)
//       .expect(403)
//       .expect('Content-Type', /application\/json/);
//   });
//   describe('not get single user', () => {
//     let singleUser;
//     beforeEach(async () => {
//       const users = await helper.usersInDb();
//       singleUser = users[2];
//     });
//     test('with id of another user', async () => {
//       await api
//         .get(`/api/users/${singleUser.id}`)
//         .set('Authorization', `bearer ${nonAdminToken}`)
//         .expect(403)
//         .expect('Content-Type', /application\/json/);
//     });
//     test('but can with "me" as id', async () => {
//       await api
//         .get('/api/users/me')
//         .set('Authorization', `bearer ${nonAdminToken}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
//     });
//   });
//   describe('not update single user', () => {
//     let singleUser;
//     let userData;
//     beforeEach(async () => {
//       const users = await helper.usersInDb();
//       singleUser = users[2];
//       userData = {
//         email: nonAdminUser.email,
//         first_name: 'Mark',
//         last_name: nonAdminUser.last_name,
//         phone_number: nonAdminUser.phone_number,
//         street_address: nonAdminUser.street_address,
//         postal_code: nonAdminUser.postal_code,
//         city: nonAdminUser.city,
//         birth_date: nonAdminUser.birth_date,
//       };
//     });
//     test('with id of another user', async () => {
//       await api
//         .patch(`/api/users/${singleUser.id}`)
//         .send(userData)
//         .set('Authorization', `bearer ${nonAdminToken}`)
//         .expect(403)
//         .expect('Content-Type', /application\/json/);
//     });
//     test('but can with users own id', async () => {
//       await api
//         .patch(`/api/users/${nonAdminUser.id}`)
//         .send(userData)
//         .set('Authorization', `bearer ${nonAdminToken}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
//     });
//   });
//   test('not delete single user', async () => {
//     await api
//       .delete(`/api/users/${nonAdminUser.id}`)
//       .set('Authorization', `bearer ${nonAdminToken}`)
//       .expect(403)
//       .expect('Content-Type', /application\/json/);
//   });
// });

// describe('unauthorized user can', () => {
//   let singleUser;
//   beforeEach(async () => {
//     const users = await helper.usersInDb();
//     singleUser = users[1];
//   });
//   test('not get list of users', async () => {
//     await api
//       .get('/api/users')
//       .expect(401)
//       .expect('Content-Type', /application\/json/);
//   });
//   test('not get single user', async () => {
//     await api
//       .get(`/api/users/${singleUser.id}`)
//       .expect(401)
//       .expect('Content-Type', /application\/json/);
//   });
//   test('not update single user', async () => {
//     await api
//       .patch(`/api/users/${singleUser.id}`)
//       .expect(401)
//       .expect('Content-Type', /application\/json/);
//   });
//   test('not delete single user', async () => {
//     await api
//       .delete(`/api/users/${singleUser.id}`)
//       .expect(401)
//       .expect('Content-Type', /application\/json/);
//   });
// });

// afterAll(async () => {
//   await User.deleteMany({});
//   await mongoose.connection.close();
// });
