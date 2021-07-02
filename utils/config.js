require('dotenv').config();

let PORT = process.env.PORT;
let JWT_SECRET = process.env.JWT_SECRET;
let MONGODB_URI = process.env.MONGODB_URI;
let KLARNA_API_URL = process.env.KLARNA_API_URL;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  KLARNA_API_URL,
};
