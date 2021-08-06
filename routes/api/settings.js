const router = require('express').Router();
const Settings = require('../../models/settings');
const { checkAuth } = require('../../utils/middleware');

router.get('/', async (req, res, next) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAuth, async (req, res, next) => {
  try {
    const existingSettings = await Settings.findOne();
    if (existingSettings) {
      return res.status(400).json({ error: 'Settings already created' });
    }
    const newSettings = new Settings(req.body);
    const settins = await newSettings.save();
    res.status(201).json(newSettings);
  } catch (err) {
    next(err);
  }
});

router.put('/', checkAuth, async (req, res, next) => {
  try {
    const settings = req.body;
    const updatedSettings = await Settings.findOneAndUpdate({}, settings, {
      new: true,
    });
    res.json(updatedSettings);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Settings.findOneAndDelete({});
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
