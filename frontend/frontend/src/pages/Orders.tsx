import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../api/order';
import { useAuth } from '../context/AuthContext';

const statusColors: Record<string, string> = {
  PLACED: 'bg-blue-100 text-blue-600',
  PREPARING: 'bg-yellow-100 text-yellow-600',
  DELIVERED: 'bg-green-100 text-green-600',
  CANCELLED: 'bg-red-100 text-red-500',
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

  if (loading) return <div className="text-gray-400 text-center py-20">Loading orders...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
        <p className="text-gray-400 text-sm mt-1">{orders.length} order(s) found</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-400 text-lg">No orders yet</p>
          <p className="text-gray-300 text-sm mt-1">Place an order from your cart</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{statusIcons[order.status] || '📋'}</span>
                  <div>
                    <p className="font-bold text-gray-800">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{order.orderItems?.length || 0} item(s)</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-500'}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.orderItems?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span>🍽️</span>
                      <span className="text-gray-700">{item.foodItem?.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                      <span>x{item.quantity}</span>
                      <span className="font-semibold text-orange-500">
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