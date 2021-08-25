const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const initialUsers = [
  {
    email: 'jester@test.com',
    first_name: 'Jester',
    last_name: 'Test',
    phone_number: '5555555',
    street_address: '555 Jester Street',
    postal_code: 55555,
    city: 'Test City',
    birth_date: Date.now(),
    is_admin: true,
  },
  {
    email: 'johndoe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '1111111',
    street_address: '111 Doe Street',
    postal_code: 11111,
    city: 'Doe City',
    birth_date: Date.now(),
  },
  {
    email: 'jackdoe@example.com',
    first_name: 'Jack',
    last_name: 'Doe',
    phone_number: '2222222',
    street_address: '222 Doe Street',
    postal_code: 22222,
    city: 'Doe City',
    birth_date: Date.now(),
  },
  {
    email: 'janedoe@example.com',
    first_name: 'Jane',
    last_name: 'Doe',
    phone_number: '3333333',
    street_address: '333 Doe Street',
    postal_code: 33333,
    city: 'Doe City',
    birth_date: Date.now(),
  },
];

const initializeUsers = async () => {
  await User.deleteMany({});
  const usersWithPassword = await Promise.all(
    initialUsers.map(async (user) => {
      const passwordHash = await bcrypt.hash('test123', 10);
      return { ...user, passwordHash };
    })
  );
  await User.insertMany(usersWithPassword);
};

const loginUser = async (user) => {
  const userForToken = {
    user: {
      email: user.email,
      id: user.id,
      is_admin: user.is_admin,
    },
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  return token;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  loginUser,
  initialUsers,
  initializeUsers,
  usersInDb,
};
