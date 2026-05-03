import { useEffect, useState } from 'react';
import { getAllFoods, addFood, deleteFood } from '../api/food';
import { getAllCategories } from '../api/category';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const { role } = useAuth();
  const [foods, setFoods] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ name: '', price: '', status: 'AVAILABLE', categoryId: '', imageUrl: '' });

  const fetchFoods = () => {
    getAllFoods().then(r => {
      const data = Array.isArray(r.data) ? r.data : [];
      setFoods(data);
    });
    getAllCategories().then(r => {
      const data = Array.isArray(r.data) ? r.data : [];
      setCategories(data);
    });
  };

  useEffect(() => { fetchFoods(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      setMsg('Please fill all fields');
      return;
    }
    try {
      await addFood({
        name: form.name,
        price: parseFloat(form.price),
        status: form.status,
        category: { id: parseInt(form.categoryId) },
        imageUrl: form.imageUrl,
      });
      setMsg('Food item added!');
      setForm({ name: '', price: '', status: 'AVAILABLE', categoryId: '', imageUrl: '' });
      setShowForm(false);
      fetchFoods();
    } catch (e) {
      setMsg('Failed to add item');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    await deleteFood(id);
    fetchFoods();
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Product Management</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{foods.length} items in inventory</p>
          </div>
        </div>
        {role === 'ADMIN' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl ${showForm ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-900 text-white hover:bg-amber-600'}`}
          >
            {showForm ? 'Cancel Operation' : '+ Add New Product'}
          </button>
        )}
      </div>

      {msg && (
        <div className="mb-8 bg-green-500/10 text-green-400 border border-green-500/20 px-6 py-4 rounded-2xl text-sm font-black tracking-wide animate-bounce-in shadow-2xl">
          <span className="mr-2">⚡</span>
          {msg}
        </div>
      )}

      {showForm && role === 'ADMIN' && (
        <div className="glass-panel rounded-[2.5rem] p-10 mb-10 border border-white/10 relative overflow-hidden animate-fade-in-up">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl"></div>
          <h3 className="font-black text-2xl text-white mb-8 tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-sm italic">i</span>
             Create Food Entry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Product Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full mt-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="Delicious Dish..."
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Price (LKR)</label>
              <input
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                type="number"
                className="w-full mt-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Category Group</label>
              <select
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="w-full mt-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none"
              >
                <option value="" className="bg-[#0b0f19] text-white">Select group...</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id} className="bg-[#0b0f19] text-white">{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Availability Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full mt-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none"
              >
                <option value="AVAILABLE" className="bg-[#0b0f19] text-white">Available</option>
                <option value="OUT_OF_STOCK" className="bg-[#0b0f19] text-white">Out of Stock</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Image Presentation URL</label>
              <input
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full mt-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="https://images.unsplash.com/path-to-quality-image"
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-10 bg-white text-gray-900 hover:bg-amber-500 hover:text-white font-black px-12 py-5 rounded-2xl transition-all duration-300 shadow-2xl flex items-center gap-3 uppercase tracking-widest text-xs"
          >
            Deploy Product Entry
          </button>
        </div>
      )}

      <div className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="text-left px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Display</th>
                <th className="text-left px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Product Identity</th>
                <th className="text-left px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Category</th>
                <th className="text-left px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Pricing</th>
                <th className="text-left px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Inventory</th>
                {role === 'ADMIN' && <th className="text-right px-8 py-6 text-gray-500 font-black uppercase tracking-widest text-[10px]">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {foods.map((food: any) => (
                <tr key={food.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <p className="font-black text-white group-hover:text-amber-400 transition-colors text-lg tracking-tight leading-tight pb-1">{food.name}</p>
                     <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1">UID: {food.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs text-gray-400 font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      {food.category?.name}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-amber-500 font-black text-lg tracking-tight">Rs. {food.price.toFixed(2)}</td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${food.status === 'AVAILABLE' ? 'text-green-400 border-green-500/20 bg-green-500/10' : 'text-red-400 border-red-500/20 bg-red-500/10'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${food.status === 'AVAILABLE' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      {food.status.replace('_', ' ')}
                    </div>
                  </td>
                  {role === 'ADMIN' && (
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-red-500/10 hover:border-red-500/20 ml-auto"
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}