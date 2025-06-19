import React, { useEffect, useState ,useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import ExploreRestaurant from '../ExploreRestaurant/ExploreRestaurant'; // Import the ExploreRestaurant component
import FoodItem from '../FoodItem/FoodItem'; // Import the FoodItem component

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);     // Store restaurants list
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Selected restaurant
  const [selectedMenu, setSelectedMenu] = useState(null); // Store selected restaurant menu
  const [loading, setLoading] = useState(true);           // Handle loading state
  const [error, setError] = useState(null);               // Handle error state
  const {url} = useContext(StoreContext);
  // Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(url+"/api/food/get-restaurants" ,  {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      console.log(response);
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching restaurant data.");
      setLoading(false);
    }
  };

  // Fetch menu based on restaurant ID
  const fetchMenu = async (restaurantId) => {
    try {
      setLoading(true);
      const response = await axios.get(url+`/api/food/get-restaurant-menu/${restaurantId}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      })
      console.log(response);
      setSelectedMenu(response.data);  // Store menu for selected restaurant
      setLoading(false);
    } catch (error) {
      setError("Error fetching menu data.");
      setLoading(false);
    }
  };

  // Fetch the menu when a restaurant is selected
  useEffect(() => {
    if (selectedRestaurant) {
      fetchMenu(selectedRestaurant.restaurant_id);
    }
  }, [selectedRestaurant]);

  // Load restaurants when the component mounts
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display the ExploreRestaurant component to show the list of restaurants */}
      {!loading && !error && (
        <ExploreRestaurant
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          restaurantList={restaurants}
        />
      )}

      {/* Display the selected restaurant's menu */}
      {selectedMenu && (
        <div>
          <h2>Menu</h2>
          <div className="menu-items">
            {selectedMenu.map((item, index) => (
              <FoodItem
                key={index}
                restaurant_id = {selectedRestaurant.restaurant_id}
                id={item.item_id}
                name={item.item_name}
                price={item.price}
                description={item.item_description}
                image={item.image_url}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
