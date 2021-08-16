const router = require('express').Router();
const Category = require('../../models/category');
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../utils/middleware');

const categories = [
  {
    name: 'Category 1',
    description: 'Description',
    products: [
      {
        id: 1,
        name: 'Product 1',
      },
      {
        id: 2,
        name: 'Product 2',
      },
      {
        id: 3,
        name: 'Product 3',
      },
    ],
    parent_category: true,
    sub_categories: [2, 3],
  },
  {
    name: 'Category 2',
    description: 'Description',
    products: [
      {
        id: 4,
        name: 'Product 4',
      },
      {
        id: 5,
        name: 'Product 5',
      },
      {
        id: 6,
        name: 'Product 6',
      },
    ],
    parent_category: false,
    sub_categories: [],
  },
  {
    name: 'Category 3',
    description: 'Description',
    products: [
      {
        id: 7,
        name: 'Product 7',
      },
      {
        id: 8,
        name: 'Product 8',
      },
      {
        id: 9,
        name: 'Product 9',
      },
    ],
    parent_category: false,
    sub_categories: [],
  },
  {
    name: 'Category 4',
    description: 'Description',
    products: [
      {
        id: 10,
        name: 'Product 10',
      },
      {
        id: 11,
        name: 'Product 11',
      },
      {
        id: 12,
        name: 'Product 12',
      },
    ],
    parent_category: true,
    sub_categories: [],
  },
];

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
  checkAuth,
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
  checkAuth,
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

router.delete('/:id', async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
