const jwt = require('jsonwebtoken');
const config = require('./config');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const { user } = jwt.verify(token, config.JWT_SECRET);
      req.user = user;
    } catch (err) {
      next(err);
    }
  }
  next();
};

const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  } else if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = {
  tokenExtractor,
  checkAuth,
  checkAdmin,
};
