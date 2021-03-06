const router = require('express').Router();
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../../utils/middleware');
const Category = require('../../models/category');

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const options = {
        page,
        limit,
      };
      const products = await Product.paginate({}, options);
      return res.json(products);
    }
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  [
    check('reference', 'Reference is required').exists(),
    check('name', 'Name is required').exists(),
    check('category', 'Category is required').exists(),
    check('unit_price', 'Unit price is required').isNumeric(),
    check('tax_rate', 'Tax rate is required').isNumeric(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = new Product(req.body);
      product.unit_price = product.unit_price * 100;
      product.tax_rate = product.tax_rate * 100;
      const category = await Category.findById(req.body.category);
      category.products.unshift(product._id);
      await category.save();
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  [
    check('reference', 'Reference is required').exists(),
    check('type', 'Type is required').exists(),
    check('quantity_unit', 'Quantity unit is required').exists(),
    check('name', 'Name is required').exists(),
    check('unit_price', 'Unit price is required').isNumeric(),
    check('tax_rate', 'Tax rate is required').isNumeric(),
    check('times_purchased', 'Times purchased is required').isNumeric(),
  ],
  checkAdmin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = req.body;
      product.unit_price = product.unit_price * 100;
      product.tax_rate = product.tax_rate * 100;
      if (product.category) {
        const category = await Category.findById(product.category);
        category.products.unshift(req.params.id);
        await category.save();
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        product,
        {
          new: true,
        }
      );
      res.json(updatedProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.delete('/:id', checkAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
