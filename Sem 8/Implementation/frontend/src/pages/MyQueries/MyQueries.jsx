import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './MyQueries.css';
import { StoreContext } from '../../context/StoreContext';

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState({}); // Store loading state per button
  const { url } = useContext(StoreContext);
  const [res, setRes] = useState({});

  // Fetch Queries
  const fetchQueries = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await axios.get(`${url}/api/order/get-user-queries/${user_id}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      console.log("Fetched queries:", response.data);
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  // Handle Best Bid Request
  const getBestBid = async (queryId) => {
    setLoading((prev) => ({ ...prev, [queryId]: true })); // Set loading only for clicked button
    try {
      const response = await axios.get(`http://localhost:8080/api/bids/select-best/${queryId}`);
      console.log(`Best bid response for query ${queryId}:`, response.data);
      alert(`Best bid selected successfully for Query ID: ${queryId}`);

      setRes((prev) => ({
        ...prev,
        [queryId]: response.data, // Store the bid details for that query ID
      }));

      fetchQueries();
    } catch (error) {
      console.error(`Error getting best bid for query ${queryId}:`, error);
      alert("Failed to get best bid. Try again.");
    }
    setLoading((prev) => ({ ...prev, [queryId]: false })); // Reset loading only for that button
  };

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      fetchQueries();
    }
  }, []);

  return (
    <div className="my-queries">
      <h2>My Queries</h2>
      <div className="queries-container">
        {queries.length > 0 ? (
          queries.map((query) => (
            <div key={query.query_id} className="query-card">
              <div className="query-header">
                <span>{query.food_type} - {query.occasion}</span>
                <span className={`query-status status-${query.query_status.toLowerCase()}`}>
                  {query.query_status}
                </span>
              </div>
              <div className="query-details">
                <p><span>People:</span> {query.people}</p>
                <p><span>Food Items:</span> {query.food_items}</p>
                <p><span>Budget:</span> Rs. {query.budget}</p>
                <p><span>Event Date:</span> {query.event_date}</p>
                <p><span>Event Time:</span> {query.event_time}</p>
                <p><span>Additional Info:</span> {query.additional_info || "N/A"}</p>
              </div>

              {/* Get Best Bid Button (Only for Pending Queries) */}
              {query.query_status.toLowerCase() === "pending" && (
                <button
                  className="best-bid-button"
                  onClick={() => getBestBid(query.query_id)}
                  disabled={loading[query.query_id]}
                >
                  {loading[query.query_id] ? "Fetching..." : "Get Best Bid"}
                </button>
              )}

              {/* Display Restaurant Details if Available */}
              {/* only display iF available */}
              {query.restaurant_name && (
                <div className="restaurant-details">
                  <strong>Restaurant Details</strong>
                  <p><span>Name:</span> {query.restaurant_name}</p>
                  <p><span>Contact:</span> {query.contact_no}</p>
                  {/* <p><span>Address:</span> {query.address || "Not Available"}</p> */}
                </div>
              )}


            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>No queries found.</p>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
