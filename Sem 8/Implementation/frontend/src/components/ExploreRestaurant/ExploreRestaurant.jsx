import React from 'react';
import './ExploreRestaurant.css';  // Import the corresponding CSS
import { food_list } from '../../assets/assets';

const ExploreRestaurant = ({ selectedRestaurant, setSelectedRestaurant, restaurantList }) => {
  return (
    <div className='explore-restaurant' id='explore-restaurant'>
      <h1>Explore Restaurants</h1>
      <p className='explore-restaurant-text'>
        Discover a variety of restaurants to satisfy your cravings.
      </p>
      <div className="explore-restaurant-list">
        {restaurantList.map((restaurant, index) => {
          return (
            <div
              onClick={() => setSelectedRestaurant(prev => prev === restaurant ? null : restaurant)}
              className="explore-restaurant-list-item"
              key={index}
            >
              <img
                className={selectedRestaurant?.restaurant_name === restaurant.restaurant_name ? "active" : ""}
                src={food_list[index].image}
                alt={restaurant.restaurant_name}
              />
              <p>{restaurant.restaurant_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreRestaurant;
