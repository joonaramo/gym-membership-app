const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = app;
