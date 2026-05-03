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

  if (loading) return <div className="text-gray-400 text-center py-20">Loading cart...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <p className="text-gray-400 text-sm mt-1">{items.length} item(s)</p>
        </div>
        {items.length > 0 && (
          <button onClick={handleClear} className="text-sm text-red-400 hover:text-red-600 font-medium transition">
            Clear All
          </button>
        )}
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {msg}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-400 text-lg">Your cart is empty</p>
          <p className="text-gray-300 text-sm mt-1">Add items from the Menu</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    🍽️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.foodItem?.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    <p className="text-orange-500 font-bold text-sm">
                      Rs. {((item.foodItem?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-400 hover:text-red-600 text-xl font-bold transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between text-gray-500 text-sm mb-2">
              <span>Subtotal</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-3 mt-3">
              <span>Total</span>
              <span className="text-orange-500">Rs. {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleOrder}
              className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}