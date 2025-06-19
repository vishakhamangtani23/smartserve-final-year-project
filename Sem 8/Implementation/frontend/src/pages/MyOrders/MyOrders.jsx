import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/order/user-orders`, 
        {}, 
        {
          headers: {
            token,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        }
      );

      // Convert 'items' to an array safely
      const formattedOrders = response.data.orders.map(order => ({
        ...order,
        items: typeof order.items === "string" ? JSON.parse(order.items) : order.items || [] 
      }));

      setOrders(formattedOrders);
      console.log(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Order" />
              <div className="order-details">
                <p><b>Order ID:</b> #{order.order_id}</p>
                <p><b>Date:</b> {new Date(order.order_date).toLocaleDateString()}</p>
                <p><b>Items:</b></p>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.item_name} ({item.price} Rs)</li>
                  ))}
                </ul>
                <p><b>Total Quantity:</b> {order.quantity}</p>
                <p><b>Total Price:</b> Rs. {order.total_amount}</p>
                <p><b>Status:</b> <span className={`status ${order.order_status.toLowerCase()}`}>{order.order_status}</span></p>
              </div>
              {/* Hide Track Order button if status is Delivered */}
              {order.order_status.toLowerCase() !== "delivered" && (
                <button onClick={fetchOrders}>Track Order</button>
              )}
            </div>
          ))
        ) : (
          <p>No past orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;