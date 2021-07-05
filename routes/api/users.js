const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../utils/middleware');
const User = require('../../models/user');

router.get('/', checkAuth, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    let id;
    if (req.params.id === 'me') {
      id = req.user.id;
    } else {
      id = req.params.id;
    }
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/:id',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('first_name', 'First name is required').exists(),
    check('last_name', 'Last name is required').exists(),
    check('phone_number', 'Phone number is required').exists(),
    check('street_address', 'Street address is required').isNumeric(),
    check('postal_code', 'Postal code is required').isNumeric(),
    check('city', 'City is required').isNumeric(),
    check('birth_date', 'Birth date is required').isDate(),
  ],
  checkAuth,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      const {
        email,
        first_name,
        last_name,
        phone_number,
        street_address,
        postal_code,
        city,
        birth_date,
        is_admin,
      } = req.body;
      user.email = email;
      user.first_name = first_name;
      user.last_name = last_name;
      user.phone_number = phone_number;
      user.street_address = street_address;
      user.postal_code = postal_code;
      user.city = city;
      user.birth_date = birth_date;
      user.is_admin = is_admin;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
