const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// POST /payments/:orderId
router.post('/:orderId', auth, async (req, res) => {
  try {
    const existing = await Payment.findOne({ order: req.params.orderId });
    if (existing) return res.status(400).json({ message: 'Payment already exists for this order' });

    const payment = await Payment.create({
      order: req.params.orderId,
      status: 'COMPLETED',
    });

    await Order.findByIdAndUpdate(req.params.orderId, { status: 'DELIVERED' });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /payments/order/:orderId
router.get('/order/:orderId', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;