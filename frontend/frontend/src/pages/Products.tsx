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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-400 text-sm mt-1">{foods.length} items available</p>
        </div>
        {role === 'ADMIN' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl transition"
          >
            {showForm ? 'Cancel' : '+ Add Item'}
          </button>
        )}
      </div>

      {msg && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          {msg}
        </div>
      )}

      {showForm && role === 'ADMIN' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Add New Food Item</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Food name"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">Price (Rs.)</label>
              <input
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                type="number"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">Category</label>
              <select
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="AVAILABLE">Available</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600 font-medium">Image URL</label>
              <input
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            Save Item
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-gray-500 font-semibold">Photo</th>
              <th className="text-left px-5 py-3 text-gray-500 font-semibold">Name</th>
              <th className="text-left px-5 py-3 text-gray-500 font-semibold">Category</th>
              <th className="text-left px-5 py-3 text-gray-500 font-semibold">Price</th>
              <th className="text-left px-5 py-3 text-gray-500 font-semibold">Status</th>
              {role === 'ADMIN' && <th className="text-left px-5 py-3 text-gray-500 font-semibold">Action</th>}
            </tr>
          </thead>
          <tbody>
            {foods.map((food: any) => (
              <tr key={food.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-5 py-3">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-12 h-12 rounded-xl object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100';
                    }}
                  />
                </td>
                <td className="px-5 py-3 font-semibold text-gray-800">{food.name}</td>
                <td className="px-5 py-3 text-gray-500">{food.category?.name}</td>
                <td className="px-5 py-3 text-orange-500 font-bold">Rs. {food.price.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${food.status === 'AVAILABLE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                    {food.status}
                  </span>
                </td>
                {role === 'ADMIN' && (
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="text-red-400 hover:text-red-600 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}