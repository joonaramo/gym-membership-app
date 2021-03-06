const router = require('express').Router();
const Membership = require('../../models/membership');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../../utils/middleware');

router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
        populate: 'user',
      };
      const memberships = await Membership.paginate({}, options);
      return res.json(memberships);
    }
    const memberships = await Membership.find().populate('user');
    res.json(memberships);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAdmin, async (req, res, next) => {
  try {
    const membership = await Membership.findById(req.params.id).populate(
      'user'
    );
    if (membership) {
      return res.json(membership);
    }
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  [
    check('user', 'User is required').exists(),
    check('end_date', 'End date is required').isDate(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const membership = new Membership(req.body);
      const newMembership = await membership.save();
      res.status(201).json(newMembership);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    check('start_date', 'Start date is required').isISO8601(),
    check('end_date', 'End date is required').isISO8601(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const membership = req.body;
      const updatedMembership = await Membership.findByIdAndUpdate(
        req.params.id,
        membership,
        {
          new: true,
        }
      );
      res.json(updatedMembership);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', checkAdmin, async (req, res, next) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
