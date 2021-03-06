const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const middleware = require('./utils/middleware');

const authRouter = require('./routes/api/auth');
const ordersRouter = require('./routes/api/orders');
const klarnaRouter = require('./routes/api/klarna');
const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');
const couponsRouter = require('./routes/api/coupons');
const membershipsRouter = require('./routes/api/memberships');
const settingsRouter = require('./routes/api/settings');
const categoriesRouter = require('./routes/api/categories');

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
app.use('/api/coupons', couponsRouter);
app.use('/api/memberships', membershipsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/categories', categoriesRouter);

// Health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// App version
app.get('/version', (req, res) => {
  res.send('1');
});

// Include testing route if in testing mode
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/api/testing');
  app.use('/api/testing', testingRouter);
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    if (error.errors.email) {
      return response
        .status(400)
        .json({ error: 'This email is already in use' });
    }
    return response.status(400).json({ errors: [{ msg: error.message }] });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: 'Invalid request' });
  } else if (error.name === 'Error') {
    return response
      .status(400)
      .json({ errors: [{ msg: error.response.data.error_code }] });
  }
  next(error);
};

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
