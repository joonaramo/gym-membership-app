const router = require('express').Router();
const Coupon = require('../../models/coupon');
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../utils/middleware');

router.get('/', async (req, res, next) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    res.json(coupon);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  [
    check('code', 'Code is required').exists(),
    check('value', 'Value is required').isNumeric(),
  ],
  checkAuth,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const coupon = new Coupon(req.body);
      const newCoupon = await coupon.save();
      res.status(201).json(newCoupon);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    check('code', 'Reference is required').exists(),
    check('value', 'Type is required').isNumeric(),
    check('active', 'Quantity unit is required').isBoolean(),
    check('times_used', 'Name is required').isNumeric(),
  ],
  checkAuth,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const coupon = req.body;
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        coupon,
        {
          new: true,
        }
      );
      res.json(updatedCoupon);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
