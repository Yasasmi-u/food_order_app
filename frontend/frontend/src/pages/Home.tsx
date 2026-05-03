import { useEffect, useState } from 'react';
import { getAllFoods } from '../api/food';
import { getAllCategories } from '../api/category';
import { getOrdersByUser } from '../api/order';
import { getCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { username, userId } = useAuth();
  const [stats, setStats] = useState({ foods: 0, categories: 0, orders: 0, cartItems: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getAllFoods(),
      getAllCategories(),
      userId ? getOrdersByUser(userId) : Promise.resolve({ data: [] }),
      userId ? getCart(userId) : Promise.resolve({ data: { cartItems: [] } }),
    ]).then(([f, c, o, cart]) => {
      setStats({
        foods: f.data.length,
        categories: c.data.length,
        orders: o.data.length,
        cartItems: cart.data?.cartItems?.length || 0,
      });
    }).catch(() => {});
  }, [userId]);

  const cards = [
    { label: 'Menu Items', value: stats.foods, icon: '🍽️', color: 'bg-orange-50 text-orange-500', path: '/menu' },
    { label: 'Categories', value: stats.categories, icon: '📂', color: 'bg-blue-50 text-blue-500', path: '/menu' },
    { label: 'My Orders', value: stats.orders, icon: '📋', color: 'bg-green-50 text-green-500', path: '/orders' },
    { label: 'Cart Items', value: stats.cartItems, icon: '🛒', color: 'bg-purple-50 text-purple-500', path: '/cart' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, {username}! 👋</h2>
        <p className="text-gray-400 mt-1">What would you like to eat today?</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <div
            key={card.label}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-2xl shadow-sm p-5 cursor-pointer hover:shadow-md transition"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            🍽️ Browse Menu
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition"
          >
            🛒 View Cart
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition"
          >
            📋 My Orders
          </button>
        </div>
      </div>
    </div>
  );
}