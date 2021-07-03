const config = require('../../utils/config');
const router = require('express').Router();
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../utils/middleware');

router.get('/', async (req, res, next) => {
  try {
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
    check('unit_price', 'Unit price is required').isNumeric(),
    check('tax_rate', 'Tax rate is required').isNumeric(),
  ],
  checkAuth,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = new Product(req.body);
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
  checkAuth,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        product,
        {
          new: true,
        }
      );
      res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
