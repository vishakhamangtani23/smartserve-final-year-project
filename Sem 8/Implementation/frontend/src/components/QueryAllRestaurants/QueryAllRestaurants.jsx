import React from 'react'
import './QueryAllRestaurants.css'
import { useNavigate } from "react-router-dom";
const QueryAllRestaurants = () => {
  const navigate = useNavigate();
  return (
    <div className="query-all-restaurants">
      <h1 className='m-1'>Query All Restaurants</h1>
      <button className="query-button" onClick={() => navigate("/query-form")}> Query All Restaurants</button>
      <hr />
    </div>
  )
}

export default QueryAllRestaurants
