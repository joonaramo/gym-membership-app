const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { checkAuth, checkAdmin } = require('../../utils/middleware');
const { format } = require('date-fns');
const User = require('../../models/user');

router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
        populate: 'memberships',
      };
      const users = await User.paginate({}, options);
      return res.json(users);
    }
    const users = await User.find()
      .populate('memberships')
      .populate({
        path: 'orders',
        populate: {
          path: 'products',
          model: 'Product',
        },
      });
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
      if (!req.user.is_admin) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      id = req.params.id;
    }
    const user = await User.findById(id)
      .populate('memberships')
      .populate({
        path: 'orders',
        populate: {
          path: 'products',
          model: 'Product',
        },
      });
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
    check('street_address', 'Street address is required').exists(),
    check('postal_code', 'Postal code is required').isNumeric(),
    check('city', 'City is required').exists(),
    check('birth_date', 'Birth date is required').isDate(),
  ],
  checkAdmin,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('memberships')
        .populate({
          path: 'orders',
          populate: {
            path: 'products',
            model: 'Product',
          },
        });
      const {
        email,
        first_name,
        last_name,
        phone_number,
        street_address,
        postal_code,
        city,
        birth_date,
      } = req.body;
      user.email = email;
      user.first_name = first_name;
      user.last_name = last_name;
      user.phone_number = phone_number;
      user.street_address = street_address;
      user.postal_code = postal_code;
      user.city = city;
      user.birth_date = format(new Date(birth_date), 'yyyy-MM-dd');
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
