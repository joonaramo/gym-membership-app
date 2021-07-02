require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let KLARNA_API_URL = process.env.KLARNA_API_URL;

module.exports = {
  PORT,
  MONGODB_URI,
  KLARNA_API_URL,
};
