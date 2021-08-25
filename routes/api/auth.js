const config = require('../../utils/config');
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const User = require('../../models/user');

router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('first_name', 'First name is required').exists(),
    check('last_name', 'Last name is required').exists(),
    check('phone_number', 'Phone number is required').exists(),
    check('street_address', 'Street address is required').exists(),
    check('postal_code', 'Postal code is required').isNumeric(),
    check('city', 'City is required').exists(),
    check('birth_date', 'Birth date is required').isDate(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      street_address,
      postal_code,
      city,
      birth_date,
    } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      user = new User({
        email,
        passwordHash,
        first_name,
        last_name,
        phone_number,
        street_address,
        postal_code,
        city,
        birth_date: format(new Date(birth_date), 'yyyy-MM-dd'),
      });

      await user.save();

      const payload = {
        user: {
          email: user.email,
          id: user.id,
          is_admin: user.is_admin,
        },
      };

      jwt.sign(
        payload,
        config.JWT_SECRET,
        {
          expiresIn: '7d',
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

      if (!passwordCorrect) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          email: user.email,
          id: user.id,
          is_admin: user.is_admin,
        },
      };

      jwt.sign(
        payload,
        config.JWT_SECRET,
        {
          expiresIn: '7d',
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
