import { useEffect, useState } from 'react';
import { getCart, removeFromCart, clearCart } from '../api/cart';
import { placeOrder } from '../api/order';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { userId } = useAuth();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');

  const fetchCart = () => {
    if (!userId) return;
    setLoading(true);
    getCart(userId).then(r => {
      setCart(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchCart(); }, [userId]);

  const handleRemove = async (cartItemId: number) => {
    await removeFromCart(cartItemId);
    fetchCart();
  };

  const handleClear = async () => {
    if (!userId) return;
    await clearCart(userId);
    fetchCart();
  };

  const handleOrder = async () => {
    if (!userId) return;
    try {
      await placeOrder(userId);
      setMsg('Order placed successfully!');
      setMsgType('success');
      fetchCart();
    } catch (e) {
      setMsg('Failed to place order.');
      setMsgType('error');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const items = cart?.cartItems || [];
  const total = items.reduce((sum: number, item: any) =>
    sum + (item.foodItem?.price || 0) * item.quantity, 0);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
      <div className="w-16 h-16 border-4 border-amber-500/10 border-t-amber-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 mt-6 font-bold tracking-widest uppercase text-sm">Loading your feast...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Cart</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{items.length} item(s) selected</p>
          </div>
        </div>
        {items.length > 0 && (
          <button 
            onClick={handleClear} 
            className="px-6 py-3 rounded-2xl bg-slate-200 text-slate-600 hover:bg-red-500 hover:text-white font-bold text-xs transition-all duration-300 border border-slate-300"
          >
            Clear All
          </button>
        )}
      </div>

      {msg && (
        <div className={`mb-8 px-6 py-4 rounded-[2rem] text-sm font-black tracking-wide border animate-bounce-in shadow-2xl ${msgType === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          <span className="mr-2">{msgType === 'success' ? '🎉' : '⚠️'}</span>
          {msg}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-32 glass-panel rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="text-9xl mb-8 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">🛒</div>
          <p className="text-white text-3xl font-black tracking-tight">Your cart is empty</p>
          <p className="text-gray-400 mt-2 font-medium">Ready to start your next food journey?</p>
          <button 
             onClick={() => window.location.href = '/menu'}
             className="mt-8 bg-white text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl"
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="glass-panel rounded-[2rem] p-6 flex items-center justify-between group border border-white/5 hover:border-amber-500/20 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={item.foodItem?.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                      {item.quantity}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white group-hover:text-amber-400 transition-colors leading-tight pb-1">{item.foodItem?.name}</p>
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1">
                      {item.foodItem?.category?.name || 'Food'}
                    </p>
                    <p className="text-amber-500 font-black text-lg mt-1">
                      Rs. {(item.foodItem?.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-12 h-12 rounded-2xl bg-white/5 text-gray-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-2xl font-light transition-all duration-300 border border-white/5 hover:border-red-500/20 shadow-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 border border-white/10 sticky top-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                <span>Items Subtotal</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                <span>Delivery Fee</span>
                <span className="text-green-400 font-black">FREE</span>
              </div>
              <div className="h-px bg-white/10 my-6"></div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Grand Total</p>
                  <p className="text-4xl font-black text-white tracking-tighter mt-1">
                    Rs. {total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full bg-white text-gray-900 font-black py-5 rounded-[1.5rem] shadow-xl hover:bg-amber-500 hover:text-white hover:-translate-y-1 transition-all duration-500 text-lg uppercase tracking-widest"
            >
              Confirm Order
            </button>
            <p className="text-[9px] text-gray-500 text-center mt-6 uppercase tracking-widest font-black opacity-50">
              Secure Checkout · Fast Delivery
            </p>
          </div>
        </div>
      )}
    </div>
  );
}