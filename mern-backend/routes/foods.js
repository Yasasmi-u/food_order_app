const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/authMiddleware');

// GET /foods
router.get('/', auth, async (req, res) => {
  try {
    const foods = await FoodItem.find().populate('category');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /foods/category/:id
router.get('/category/:id', auth, async (req, res) => {
  try {
    const foods = await FoodItem.find({ category: req.params.id }).populate('category');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /foods
router.post('/', auth, async (req, res) => {
  try {
    const { name, price, status, category, imageUrl } = req.body;
    const food = await FoodItem.create({
      name,
      price,
      status,
      category: category?.id || category,
      imageUrl,
    });
    const populated = await food.populate('category');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /foods/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;