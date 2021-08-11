require('dotenv').config();

let PORT = process.env.PORT;
let JWT_SECRET = process.env.JWT_SECRET;
let MONGODB_URI = process.env.MONGODB_URI;
let KLARNA_API_URL = process.env.KLARNA_API_URL;
let AXIOS_CONFIG = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      `PK41418_c00c4f82c394:uE5dXrHltcAT5Gi7`
    ).toString('base64')}`,
    'Content-Type': 'application/json',
  },
};

module.exports = {
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  KLARNA_API_URL,
  AXIOS_CONFIG,
};
