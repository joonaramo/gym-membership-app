require('dotenv').config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.DEV_MONGODB_URI;
const KLARNA_API_URL = process.env.KLARNA_API_URL;
const KLARNA_API_CREDENTIALS = process.env.KLARNA_API_CREDENTIALS;
const FRONTEND_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;
const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL
    : process.env.DEV_BACKEND_URL;

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
