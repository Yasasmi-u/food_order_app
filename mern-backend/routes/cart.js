const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/authMiddleware');

// GET /cart/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId })
      .populate({ path: 'cartItems.foodItem', populate: { path: 'category' } });

    if (!cart) {
      cart = await Cart.create({ user: req.params.userId, cartItems: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /cart/add?userId=&foodId=&quantity=
router.post('/add', auth, async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.query;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, cartItems: [] });

    const existingItem = cart.cartItems.find(
      item => item.foodItem.toString() === foodId
    );

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.cartItems.push({ foodItem: foodId, quantity: parseInt(quantity) });
    }

    await cart.save();
    const populated = await cart.populate({ path: 'cartItems.foodItem', populate: { path: 'category' } });
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/remove/:cartItemId
router.delete('/remove/:cartItemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ 'cartItems._id': req.params.cartItemId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItems = cart.cartItems.filter(
      item => item._id.toString() !== req.params.cartItemId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/clear/:userId
router.delete('/clear/:userId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItems = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;