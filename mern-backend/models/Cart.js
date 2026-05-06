const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  cartItems: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);