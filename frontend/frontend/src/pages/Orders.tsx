import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../api/order';
import { useAuth } from '../context/AuthContext';

const statusColors: Record<string, string> = {
  PLACED: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  PREPARING: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
  DELIVERED: 'bg-green-500/20 text-green-400 border-green-500/20',
  CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/20',
};

const statusIcons: Record<string, string> = {
  PLACED: '📋',
  PREPARING: '👨‍🍳',
  DELIVERED: '✅',
  CANCELLED: '❌',
};

export default function Orders() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getOrdersByUser(userId).then(r => {
      setOrders(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [userId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
      <div className="w-16 h-16 border-4 border-amber-500/10 border-t-amber-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 mt-6 font-bold tracking-widest uppercase text-sm">Fetching history...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Order History</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{orders.length} order(s) archived</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-32 glass-panel rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="text-9xl mb-8 opacity-20 group-hover:scale-110 transition-transform duration-700">📋</div>
          <p className="text-white text-3xl font-black tracking-tight">No orders yet</p>
          <p className="text-gray-400 mt-2 font-medium">Your delicious history starts here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order.id} className="glass-panel rounded-[2.5rem] p-8 border border-white/5 hover:border-amber-500/20 transition-all duration-500 shadow-2xl group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {statusIcons[order.status] || '📋'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Receipt ID</p>
                    <p className="font-bold text-2xl text-white tracking-tight leading-tight pb-1">Order #{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black tracking-[0.2em] px-4 py-2 rounded-full border shadow-lg ${statusColors[order.status] || 'bg-white/10 text-gray-400 border-white/10'}`}>
                    {order.status}
                  </span>
                  <p className="text-[10px] text-gray-500 font-bold mt-3 uppercase tracking-widest">{order.orderItems?.length || 0} ITEMS TOTAL</p>
                </div>
              </div>

              <div className="space-y-3">
                {order.orderItems?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-6 py-4 group/item hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <span className="text-xl opacity-50 group-hover/item:opacity-100 transition-opacity">🍽️</span>
                      <span className="text-white font-bold tracking-wide leading-tight pb-1">{item.foodItem?.name}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-gray-500 text-xs font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                      <span className="font-black text-amber-500 text-lg tracking-tight">
                        Rs. {((item.foodItem?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}