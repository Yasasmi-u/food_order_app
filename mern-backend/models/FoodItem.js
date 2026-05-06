const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['AVAILABLE', 'OUT_OF_STOCK'], default: 'AVAILABLE' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  imageUrl: { type: String },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);