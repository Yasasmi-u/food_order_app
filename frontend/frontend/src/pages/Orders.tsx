import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../api/order';
import { makePayment } from '../api/payment';
import { useAuth } from '../context/AuthContext';

const statusColors: Record<string, string> = {
  PLACED: 'bg-blue-100 text-blue-600 border-blue-200',
  PREPARING: 'bg-amber-100 text-amber-600 border-amber-200',
  DELIVERED: 'bg-green-100 text-green-600 border-green-200',
  CANCELLED: 'bg-red-100 text-red-600 border-red-200',
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
  const [payMsg, setPayMsg] = useState<{id: number, msg: string} | null>(null);

  const fetchOrders = () => {
    if (!userId) return;
    getOrdersByUser(userId).then(r => {
      setOrders(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [userId]);

  const handlePayment = async (orderId: number) => {
    try {
      await makePayment(orderId);
      setPayMsg({ id: orderId, msg: 'Payment Processed!' });
      setTimeout(() => setPayMsg(null), 3000);
      fetchOrders();
    } catch (e) {
      setPayMsg({ id: orderId, msg: 'Payment Failed.' });
    }
  };

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
        <div className="text-center py-32 glass-panel rounded-[3rem] border border-slate-100 relative overflow-hidden group">
          <div className="text-9xl mb-8 opacity-20 group-hover:scale-110 transition-transform duration-700">📋</div>
          <p className="text-slate-900 text-3xl font-black tracking-tight">No orders yet</p>
          <p className="text-slate-500 mt-2 font-medium">Your delicious history starts here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order.id} className="glass-panel rounded-[2.5rem] p-8 border border-slate-100 hover:border-amber-500/20 transition-all duration-500 shadow-2xl group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                    {statusIcons[order.status] || '📋'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Receipt ID</p>
                    <p className="font-bold text-2xl text-slate-900 tracking-tight leading-tight pb-1">Order #{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`text-[10px] font-black tracking-[0.2em] px-4 py-2 rounded-full border shadow-sm ${statusColors[order.status] || 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                      {order.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold mt-3 uppercase tracking-widest">{order.orderItems?.length || 0} ITEMS TOTAL</p>
                  </div>
                  {order.status === 'PLACED' && (
                    <button 
                      onClick={() => handlePayment(order.id)}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg"
                    >
                      {payMsg?.id === order.id ? payMsg.msg : 'Pay Now'}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {order.orderItems?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 group/item hover:bg-white transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <span className="text-xl opacity-50 group-hover/item:opacity-100 transition-opacity">🍽️</span>
                      <span className="text-slate-900 font-bold tracking-wide leading-tight pb-1">{item.foodItem?.name}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                      <span className="font-black text-amber-600 text-lg tracking-tight">
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