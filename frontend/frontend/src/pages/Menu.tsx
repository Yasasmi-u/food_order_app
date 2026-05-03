import { useEffect, useState } from 'react';
import { getAllFoods } from '../api/food';
import { getAllCategories } from '../api/category';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';
import { FoodItem, Category } from '../types';

export default function Menu() {
  const { userId } = useAuth();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState<number | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getAllFoods().then(r => setFoods(r.data));
    getAllCategories().then(r => setCategories(r.data));
  }, []);

  const filtered = foods.filter(f => {
    const matchCat = selectedCategory ? f.category?.id === selectedCategory : true;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = async (foodId: number, name: string) => {
    if (!userId) return;
    setAdding(foodId);
    try {
      await addToCart(userId, foodId, 1);
      setSuccess(`${name} added to cart!`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (e) {
      console.error(e);
    }
    setAdding(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search food..."
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-64"
        />
      </div>

      {/* Success toast */}
      {success && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
          ✅ {success}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition
            ${!selectedCategory ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-400'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${selectedCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-orange-400'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(food => (
          <div key={food.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
            {/* Food image placeholder */}
            <div className="bg-orange-100 rounded-xl h-36 flex items-center justify-center mb-3">
              <span className="text-5xl">🍽️</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="text-xs text-orange-500 font-semibold">{food.category?.name}</span>
              <h3 className="font-bold text-gray-800 mt-1">{food.name}</h3>
              <p className="text-orange-500 font-bold mt-1">Rs. {food.price.toFixed(2)}</p>
            </div>

            {/* Status + Button */}
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full
                ${food.status === 'AVAILABLE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                {food.status === 'AVAILABLE' ? '● Available' : '✕ Out of Stock'}
              </span>
              <button
                disabled={food.status !== 'AVAILABLE' || adding === food.id}
                onClick={() => handleAdd(food.id, food.name)}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400
                  text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
              >
                {adding === food.id ? '...' : '+ Add'}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-4 text-center text-gray-400 py-20">
            No food items found 🍽️
          </div>
        )}
      </div>
    </div>
  );
}