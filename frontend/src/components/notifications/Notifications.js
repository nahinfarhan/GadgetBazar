import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await apiCall('/api/notifications');
      setNotifications(res.data?.notifications || res.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiCall(`/api/notifications/${id}/read`, { method: 'PUT' });
      fetchNotifications();
      window.dispatchEvent(new Event('notificationRead'));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleNotificationClick = async (notification) => {
    if (notification.data?.orderId) {
      try {
        const allOrders = await apiCall('/api/orders');
        const order = (allOrders.data?.orders || []).find(o => o.id === notification.data.orderId);
        if (order) setSelectedOrder(order);
        markAsRead(notification.id);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    } else if (notification.data?.productId) {
      navigate(`/product/${notification.data.productId}`);
      markAsRead(notification.id);
    }
  };

  if (loading) return <div className="p-8">Loading notifications...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        
        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => notification.data?.orderId || notification.data?.productId ? handleNotificationClick(notification) : null}
                className={`bg-white rounded-lg shadow p-4 ${notification.data?.orderId || notification.data?.productId ? 'cursor-pointer hover:shadow-md' : ''} transition ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className="text-blue-600 hover:underline text-sm ml-4"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono text-sm">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold capitalize">{selectedOrder.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                  <p className="bg-gray-50 p-3 rounded">{selectedOrder.shippingAddress}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Phone</p>
                  <p>{selectedOrder.phone || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Order Items</p>
                  <div className="border rounded">
                    {(typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items).map((item, idx) => (
                      <div key={idx} className="p-3 border-b last:border-b-0 flex gap-4">
                        <img src={item.product?.images?.[0] || '/placeholder.png'} alt={item.product?.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-semibold">{item.product?.name || 'Product'}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">৳{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>৳{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
