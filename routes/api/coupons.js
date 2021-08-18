const router = require('express').Router();
const Coupon = require('../../models/coupon');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../../utils/middleware');

router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
      };
      const coupons = await Coupon.paginate({}, options);
      return res.json(coupons);
    }
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    next(err);
  }
});

router.get('/code/:code', async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAdmin, async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      return res.json(coupon);
    }
    res.status(404).json({ error: 'Not found' });
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
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const coupon = new Coupon(req.body);
      coupon.value = coupon.value * 100;
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
    check('code', 'Code is required').exists(),
    check('value', 'Value is required').isNumeric(),
    check('active', 'State is required').isBoolean(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const coupon = req.body;
      coupon.value = coupon.value * 100;
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

router.delete('/:id', checkAdmin, async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
