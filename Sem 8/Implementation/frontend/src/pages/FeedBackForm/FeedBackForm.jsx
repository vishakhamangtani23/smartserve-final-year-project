import React, { useState, useEffect, useContext, useNavigate } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./FeedBackForm.css";


const FeedBackForm = () => {
  const navigate = (path) => {
    const navigate = useNavigate()
    return () => navigate(path)
  }

  const { url } = useContext(StoreContext);
  const { billId } = useParams();
  const [order, setOrder] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [restaurantFeedback, setRestaurantFeedback] = useState({
    hygiene: "",
    packaging: "",
    quality: "",
    deliveredOnTime: "",
    experience: ""
  });
  const [qualitativeFeedback, setQualitativeFeedback] = useState("");

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/order/order-details/${billId}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        console.log(response.data);
        setOrder(response.data);

        const parsedItems = JSON.parse(response.data.order_items_json);
        setFeedback(parsedItems.map((item) => ({
          item_id: item.order_detail_id,
          item_name: item.item_name,
          rating: ""
        })));
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchBillDetails();
  }, [billId, url]);

  const handleFeedbackChange = (index, field, value) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index][field] = value;
    setFeedback(updatedFeedback);
  };

  const handleRestaurantFeedbackChange = (field, value) => {
    setRestaurantFeedback((prev) => ({ ...prev, [field]: value }));
  };

  const submitFeedback = async () => {
    try {
      const feedbackData = {
        order_id: billId,
        restaurant_id: order.restaurant_id,
        feedback_items: feedback,
        restaurant_feedback: restaurantFeedback,
        qualitative_feedback: qualitativeFeedback
      };
      console.log(feedbackData);
      await axios.post(`${url}/api/feedback/submitFeedback`, feedbackData,{
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
      alert("🎉 Feedback submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!order) return <p className="ff-p loading">⏳ Loading order details...</p>;

  return (
    <div className="feedback-container">
      <h2>👋 Hi {order.customer_name},</h2>
      <h2>📝 Feedback for {order.restaurant_name}</h2>
      <p className="ff-p"><strong>📍 Address:</strong> {order.restaurant_address}</p>
      <p className="ff-p"><strong>📅 Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>

      <hr />

      <h3 className="m-1"> Rate Dishes that you ordered</h3>
      {feedback.map((item, index) => (
        <div key={item.item_id} className="feedback-item">
          <h3>{item.item_name}</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${feedback[index]?.rating >= star ? "selected" : ""}`}
                onClick={() => handleFeedbackChange(index, "rating", star)}>
                ★
              </span>
            ))}
          </div>
        </div>
      ))}

      <hr />

      <h3>🏡 Restaurant Experience</h3>
      <label>🙋‍♂️ Did you have a good experience?</label>
      <div className="radio-group">
        <label><input type="radio" name="experience" value="Yes" onChange={(e) => handleRestaurantFeedbackChange("experience", e.target.value)} /> ✅ Yes</label>
        <label><input type="radio" name="experience" value="No" onChange={(e) => handleRestaurantFeedbackChange("experience", e.target.value)} /> ❌ No</label>
      </div>
      <br />
      {["Hygiene", "Packaging", "Quality"].map((field) => (
        <div key={field}>
          <label>{field} Rating (1-5):</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${restaurantFeedback[field.toLowerCase()] >= star ? "selected" : ""}`}
                onClick={() => handleRestaurantFeedbackChange(field.toLowerCase(), star)}>
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
      <br />
      <label>🚚 Was the order delivered on time?</label>
      <div className="radio-group">
        <label><input type="radio" name="deliveredOnTime" value="1" onChange={(e) => handleRestaurantFeedbackChange("deliveredOnTime", e.target.value)} /> ✅ Yes</label>
        <label><input type="radio" name="deliveredOnTime" value="0" onChange={(e) => handleRestaurantFeedbackChange("deliveredOnTime", e.target.value)} /> ❌ No</label>
      </div>
      <label>💬 Additional Feedback:</label>
      <textarea value={qualitativeFeedback} onChange={(e) => setQualitativeFeedback(e.target.value)} placeholder="Share your experience..."></textarea>

      <button onClick={submitFeedback} className="submit-btn">
        🚀 Submit Feedback
      </button>
    </div>
  );
};

export default FeedBackForm;