const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/authMiddleware');

// POST /orders/place/:userId
router.post('/place/:userId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate('cartItems.foodItem');

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.cartItems.map(item => ({
      foodItem: item.foodItem._id,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.params.userId,
      orderItems,
      status: 'PLACED',
    });

    // Clear cart after placing order
    cart.cartItems = [];
    await cart.save();

    const populated = await order.populate({ path: 'orderItems.foodItem', populate: { path: 'category' } });
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /orders/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate({ path: 'orderItems.foodItem', populate: { path: 'category' } })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /orders/:id/status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;