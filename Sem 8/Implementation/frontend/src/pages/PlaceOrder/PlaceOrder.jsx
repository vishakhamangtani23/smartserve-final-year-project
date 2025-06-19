import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo)

      }
    })
    console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    console.log(orderData);
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token 
      ,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning":
        "true"
    } })
    console.log(response.data);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error")
    }


  }
  const navigate = useNavigate()
  useEffect(
    () => {
      if (!token) {
        navigate("/cart")
      }
      else if (getTotalCartAmount() === 0) {
        navigate("/cart")
      }
      else{
        // toast.success("Query ")
        navigate("/")
      }
    }, [token]
  )

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          delivery Information
        </p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' name="firstName" onChange={onChangeHandler} value={data.firstName} />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last Name' />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email Address' />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />

        <div className="multi-fields">
          <input type="text" placeholder='city' name="city" onChange={onChangeHandler} value={data.city} />
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='state' />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='zipcode' />
          <input type="text" placeholder='country' name="country" onChange={onChangeHandler} value={data.country} />
        </div>
        <input type="text" placeholder='phone' name="phone" onChange={onChangeHandler} value={data.phone} /></div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit"  >Proceed To payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
