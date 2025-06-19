import React, { useState, useContext } from "react";
import axios from "axios";
import "./QueryForm.css";

import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const QueryForm = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { userData } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    foodType: "",
    occasion: "",
    people: "",
    foodItems: "",
    budget: "",
    additionalInfo: "",
    eventDate: "",
    eventTime: "",
    userData
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData || !userData.token) {
      setShowLogin(true);
      return;
    }

    const queryData = {
      ...formData,
      user_id: userData.user_id,
    };

    try {
      console.log(queryData);
      const response = await axios.post("http://localhost:8080/api/order/query-all", queryData,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      console.log("Query Sent: ", response.data);
      toast.success("Query successfully sent to restaurants!");
      navigate("/");
    } catch (error) {
      console.error("Error sending query:", error);
      toast.error("Failed to send query.");
    }
  };

  return (
    <div className="query-form">
      <h2>Restaurant Query Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type of Food Order:
          <select name="foodType" value={formData.foodType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </label>

        <label>
          Occasion:
          <select name="occasion" value={formData.occasion} onChange={handleChange}>
            <option value="">Select</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="casual">Casual Outing</option>
          </select>
        </label>

        <label>
          Number of People:
          <input type="number" name="people" value={formData.people} onChange={handleChange} />
        </label>

        <label>
          Food Items (Comma Separated):
          <input type="text" name="foodItems" value={formData.foodItems} onChange={handleChange} />
        </label>

        <label>
          Budget (₹):
          <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
        </label>

        <label>
          Event Date:
          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        </label>

        <label>
          Event Time:
          <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
        </label>

        <label>
          Additional Information:
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange}></textarea>
        </label>

        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
};

export default QueryForm;
