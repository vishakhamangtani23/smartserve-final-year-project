import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({ id, name, price, description, image, restaurant_id }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        {
          !cartItems[id]
            ? <img className='add' onClick={() => {
              addToCart(id,name,price,restaurant_id);

            }} src={assets.add_icon_white}></img> : <div className="food-item-counter">
              <img onClick={() => removeFromCart(id,name,price)} src={assets.remove_icon_red}></img> <p>{cartItems[id].quantity}</p>
              <img onClick={() => addToCart(id,name,price,restaurant_id)} src={assets.add_icon_green}></img>
            </div>
        }
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>
            {name}
          </p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
          {description}
        </p>
        <p className="food-item-price">
          Rs.{price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
