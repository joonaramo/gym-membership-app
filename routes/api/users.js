const router = require('express').Router();
const User = require('../../models/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
