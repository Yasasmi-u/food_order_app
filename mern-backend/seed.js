const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Category = require('./models/Category');
const FoodItem = require('./models/FoodItem');
const Cart = require('./models/Cart');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear all
  await User.deleteMany();
  await Category.deleteMany();
  await FoodItem.deleteMany();
  await Cart.deleteMany();
  console.log('Cleared existing data');

  // Categories
  const categories = await Category.insertMany([
    { name: 'Rice & Curry' },
    { name: 'Short Eats' },
    { name: 'Beverages' },
    { name: 'Desserts' },
    { name: 'Burgers' },
  ]);
  console.log('Categories seeded');

  // Food Items
  await FoodItem.insertMany([
    { name: 'Chicken Rice & Curry', price: 350, status: 'AVAILABLE', category: categories[0]._id, imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
    { name: 'Fish Ambul Thiyal',    price: 400, status: 'AVAILABLE', category: categories[0]._id, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
    { name: 'Vegetable Rice',       price: 250, status: 'AVAILABLE', category: categories[0]._id, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' },
    { name: 'Egg Roti',             price: 80,  status: 'AVAILABLE', category: categories[1]._id, imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400' },
    { name: 'Fish Cutlet',          price: 60,  status: 'AVAILABLE', category: categories[1]._id, imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400' },
    { name: 'Vegetable Roti',       price: 70,  status: 'OUT_OF_STOCK', category: categories[1]._id, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
    { name: 'Mango Juice',          price: 150, status: 'AVAILABLE', category: categories[2]._id, imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400' },
    { name: 'Lime Soda',            price: 120, status: 'AVAILABLE', category: categories[2]._id, imageUrl: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400' },
    { name: 'Plain Tea',            price: 50,  status: 'AVAILABLE', category: categories[2]._id, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
    { name: 'Watalappan',           price: 180, status: 'AVAILABLE', category: categories[3]._id, imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400' },
    { name: 'Curd & Treacle',       price: 160, status: 'AVAILABLE', category: categories[3]._id, imageUrl: 'https://images.unsplash.com/photo-1488477181228-5f16ffd71b86?w=400' },
    { name: 'Chicken Burger',       price: 450, status: 'AVAILABLE', category: categories[4]._id, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    { name: 'Beef Burger',          price: 500, status: 'OUT_OF_STOCK', category: categories[4]._id, imageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400' },
  ]);
  console.log('Food items seeded');

  // Users
  const password = await bcrypt.hash('1234', 10);
  const users = await User.insertMany([
    { username: 'admin',   password, role: 'ADMIN' },
    { username: 'Sandun',  password, role: 'CUSTOMER' },
    { username: 'sachini', password, role: 'CUSTOMER' },
  ]);
  console.log('Users seeded');

  // Carts
  await Cart.insertMany([
    { user: users[1]._id, cartItems: [] },
    { user: users[2]._id, cartItems: [] },
  ]);
  console.log('Carts seeded');

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});