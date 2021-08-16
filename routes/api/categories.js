const router = require('express').Router();
const Category = require('../../models/category');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../../utils/middleware');

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
      };
      const categories = await Category.paginate({}, options);
      return res.json(categories);
    }
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      return res.json(category);
    }
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  [
    check('name', 'Name is required').exists(),
    check('description', 'Description is required').exists(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const category = new Category(req.body);
      const newCategory = await category.save();
      if (req.body.parent_category) {
        const parentCategory = await Category.findById(
          req.body.parent_category
        );
        parentCategory.sub_categories.unshift(newCategory.id);
        await parentCategory.save();
      }
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    check('name', 'Name is required').exists(),
    check('description', 'Description is required').exists(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      if (req.body.parent_category === req.params.id) {
        return res.status(400).json({
          errors: [{ msg: 'You can not set the category as its own parent' }],
        });
      }
      const category = req.body;
      category.value = category.value * 100;
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {
          new: true,
        }
      );
      if (req.body.parent_category) {
        const parentCategory = await Category.findById(
          req.body.parent_category
        );
        parentCategory.sub_categories.unshift(updatedCategory.id);
        await parentCategory.save();
      }
      res.json(updatedCategory);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', checkAdmin, async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
