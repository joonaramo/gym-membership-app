const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const ordersRouter = require('./routes/api/orders');
const klarnaRouter = require('./routes/api/klarna');
const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(middleware.tokenExtractor);
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/klarna', klarnaRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: 'Invalid request' });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
