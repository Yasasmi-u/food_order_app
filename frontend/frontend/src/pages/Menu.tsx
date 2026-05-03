import { useEffect, useState } from 'react';
import { getAllFoods } from '../api/food';
import { getAllCategories } from '../api/category';
import { addToCart } from '../api/cart';
import { useAuth } from '../context/AuthContext';

export default function Menu() {
  const { userId } = useAuth();
  const [foods, setFoods] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState<number | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getAllFoods().then(r => {
      const data = Array.isArray(r.data) ? r.data : [];
      setFoods(data);
    });
    getAllCategories().then(r => {
      const data = Array.isArray(r.data) ? r.data : [];
      setCategories(data);
    });
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
      setSuccess(name + ' added to cart!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (e) {
      console.error(e);
    }
    setAdding(null);
  };

  const foodEmojis: Record<string, string> = {
    'Rice & Curry': '🍛',
    'Short Eats': '🥙',
    'Beverages': '🥤',
    'Desserts': '🍮',
    'Burgers': '🍔',
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in space-y-8 md:space-y-12">
      {/* Search and Header - Stacks on Mobile */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Our Menu</h2>
          <p className="text-slate-500 mt-2 text-base md:text-lg">Delicious selections, crafted for you.</p>
        </div>
        <div className="relative group w-full md:w-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
            🔍
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search favorites..."
            className="pl-12 pr-6 py-3.5 md:py-4 bg-white border border-slate-200 rounded-xl md:rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 w-full md:w-80 transition-all shadow-sm"
          />
        </div>
      </div>

      {success && (
        <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <span className="text-xl">✅</span>
            <span className="font-bold text-sm uppercase tracking-widest">{success}</span>
          </div>
        </div>
      )}

      {/* Category Pills - Horizontal Scroll on Mobile */}
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`whitespace-nowrap px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${!selectedCategory ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
        >
          All
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
          >
            <span className="text-base md:text-lg">{foodEmojis[cat.name] || '🍽️'}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* Food Grid - 1 to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filtered.map((food: any) => (
          <div key={food.id} className="glass-panel rounded-[2rem] md:rounded-[2.5rem] border border-white/10 hover:border-amber-500/30 transition-all duration-500 flex flex-col overflow-hidden group shadow-xl">
            <div className="h-48 md:h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10"></div>
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                }}
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white font-black bg-amber-500 px-3 py-1.5 rounded-full shadow-lg">
                  {food.category?.name}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#0b0f19]">
              <div className="flex-1">
                <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-amber-400 transition-colors leading-tight pb-1">{food.name}</h3>
                <p className="text-amber-500 font-black mt-2 text-xl md:text-2xl tracking-tight">Rs. {food.price.toFixed(2)}</p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className={`flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest ${food.status === 'AVAILABLE' ? 'text-green-400' : 'text-red-400'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${food.status === 'AVAILABLE' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-red-400'}`}></div>
                  {food.status === 'AVAILABLE' ? 'Available' : 'Sold Out'}
                </div>
                <button
                  disabled={food.status !== 'AVAILABLE' || adding === food.id}
                  onClick={() => handleAdd(food.id, food.name)}
                  className="bg-white text-gray-900 hover:bg-amber-500 hover:text-white disabled:bg-gray-800 disabled:text-gray-600 font-black px-5 py-3 rounded-xl md:rounded-2xl transition-all duration-300 shadow-xl flex items-center gap-2 group/btn text-[10px] md:text-xs uppercase tracking-widest"
                >
                  {adding === food.id ? '...' : <><span className="text-lg">+</span> ADD</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}