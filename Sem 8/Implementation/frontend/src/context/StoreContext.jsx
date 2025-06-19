import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({})
  // const url = "https://30db-103-120-254-24.ngrok-free.app"
  const url = "http://localhost:8080"
  const [userData, setUserData] = useState({})
  const [food_list, setFoodList] = useState([]);


  const addToCart = async (itemId, name, price, restaurant_id) => {


    // Check if adding this item would result in multiple restaurants in the cart
    const currentRestaurantIds = new Set(Object.values(cartItems).map(item => item.restaurant_id));
    if (currentRestaurantIds.size > 0 && !currentRestaurantIds.has(restaurant_id)) {
      console.log("Note: You can only order from one restaurant at a time. Please complete your current order before adding items from another restaurant.");
      toast.warn(<div>
        Note: You can only order from one restaurant at a time. Please complete your current order before adding items from another restaurant.
      </div>,
        {
          position: "top-right",
          autoClose: 2000, // Toast closes after 2 seconds
        })
      return; // Exit the function to prevent adding the item
    }
    else {


      console.log(itemId, price, name)
      console.log(cartItems)
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: {
            name,
            price,
            quantity: 1,
            restaurant_id
            // Initial quantity
          }
        }));
      }
      // } else {
      //   setCartItems((prev) => ({
      //     ...prev,
      //     [itemId]: {
      //       ...prev[itemId], // Spread the existing item data
      //       quantity: prev[itemId].quantity + 1 // Increment the quantity properly
      //     }
      //   }));
      // }
      toast.success(
        <div>
          Added to cart! <a href="/cart">Go to Cart</a>
        </div>,
        {
          position: "top-right",
          autoClose: 2000, // Toast closes after 2 seconds
        }
      );
    }
    // if (token) {
    //   await axios.post(url + "/api/cart/add", { itemId }, {
    //     headers: {
    //       token
    //     }
    //   });
    // }
  };

  const removeFromCart = async (itemId, name, price) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId].quantity > 1) {
        // Decrement quantity if more than 1
        updatedCart[itemId].quantity -= 1;
      } else {
        // Remove the item if quantity is 1
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  }
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (item.quantity > 0) {
        totalAmount += item.price * item.quantity;
      }
    }
    return totalAmount;
  };

  // List Items from db
  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`, {
      headers: { "ngrok-skip-browser-warning": "true" }
    })
    console.log(response)
    setFoodList(response.data.data)

  }
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token, "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true" } });
    
    console.log(response)
    console.log(response.data.cartData)
    setCartItems(response.data.cartData)

  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setUserData(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart, getTotalCartAmount,
    url,
    userData, setUserData,
  }
  // using this context we can access food list everywhere 
  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider >
  )

}

export default StoreContextProvider;