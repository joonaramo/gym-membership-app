require('dotenv').config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.DEV_MONGODB_URI;
const KLARNA_API_URL = 'https://api.playground.klarna.com';
const KLARNA_API_CREDENTIALS = process.env.KLARNA_API_CREDENTIALS;
const FRONTEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://whispering-waters-22674.herokuapp.com'
    : 'http://localhost:3000';
const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://whispering-waters-22674.herokuapp.com/api'
    : 'http://localhost:5000';

const AXIOS_CONFIG = {
  headers: {
    Authorization: `Basic ${Buffer.from(KLARNA_API_CREDENTIALS).toString(
      'base64'
    )}`,
    'Content-Type': 'application/json',
  },
};

module.exports = {
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  KLARNA_API_URL,
  AXIOS_CONFIG,
  BACKEND_URL,
  FRONTEND_URL,
};
