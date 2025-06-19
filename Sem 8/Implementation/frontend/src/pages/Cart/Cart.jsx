import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = ({ showLogin, setShowLogin }) => {
  const { cartItems, setCartItems, removeFromCart, url, userData } = useContext(StoreContext);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      setLoading(false);
      return;
    }

    const fetchRestaurantDetails = async () => {
      try {
        const firstItem = cartItems[Object.keys(cartItems)[0]];
        if (!firstItem || !firstItem.restaurant_id) return;

        const response = await axios.get(`${url}/api/food/get-restaurant-details/${firstItem.restaurant_id}`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });

        if (response.data) {
          setRestaurant(response.data);
        } else {
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(cartItems).length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }

    const orderData = {
      user_id: userData.user_id,
      restaurant_id: restaurant ? restaurant.restaurant_id : null,
      event_date: eventDate,
      event_time: eventTime,
      special_instructions: specialInstructions,
      cart_items: cartItems,
    };

    if (userData.token) {
      try {
        const response = await axios.post(`${url}/api/order/send-query`, orderData, {
          headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        });

        if (response.status === 200) {
          toast.success("Query sent successfully!");
          setCartItems({});
          navigate("/");
        } else {
          console.error("Failed to send query:", response.data);
        }
      } catch (error) {
        console.error("Error sending query:", error);
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      {Object.keys(cartItems).length === 0 ? (
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="Empty Cart" />
          <h2>Your Cart is Empty</h2>
        </div>
      ) : (
        <div className="cart">
          <h2 className="cart-title">Your Order</h2>
          <div className="cart-items-list">
            {Object.entries(cartItems).map(([itemId, item]) => (
              <div key={itemId} className="cart-item">
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₹{item.price}</p>
                </div>
                <p onClick={() => removeFromCart(itemId)} className="remove-btn">❌</p>
              </div>
            ))}
          </div>

          {loading ? (
            <p className="loading-text">Fetching restaurant details...</p>
          ) : restaurant ? (
            <div className="restaurant-details">
              <h2>Restaurant</h2>
              <div className="restaurant-card">
                <h3>{restaurant.restaurant_name}</h3>
                <p>📍 {restaurant.address}</p>
                <p>📞 {restaurant.contact_no}</p>
              </div>
            </div>
          ) : (
            <p className="error-text">⚠️ No restaurant details found</p>
          )}

          <div className="cart-bottom">
            <form onSubmit={handleSubmit}>
              <div className="bulk-order-section">
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    value={eventDate}
                    required
                    onChange={(e) => setEventDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label>Time:</label>
                  <inputcart
                    type="time"
                    value={eventTime}
                    required
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>Special Instructions:</label>
                  <textarea
                    placeholder="E.g., No onions, extra spicy..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </div>

              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="button" className="coupon-btn">Apply Coupon</button>
              </div>

              <button type="submit" className="submit-btn">Send Query</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
