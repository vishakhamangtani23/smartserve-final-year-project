import React, { Profiler, useContext, useState } from 'react'
import './Navbar.css'
import { assets } from "../../assets/assets"
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

import { NavLink } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate()

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, userData , setUserData } = useContext(StoreContext)
  const logout = () => {
    setUserData("")
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to="/" ><img src={assets.logo} className='logo'></img></Link>
      <ul className='navbar-menu'>
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}> Chatbot</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!userData.token ? <button onClick={() => {
          setShowLogin(true)
        }}>Sign In</button>
          : <div className='navbar-profile'> <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown"> <Link to="/my-orders">
              <li>
               <img src={assets.bag_icon} alt="" /><p>orders</p>               </li></Link> 
              
              <hr />
              <Link to="/my-queries"><li>
                <img src={assets.bag_icon} alt="" /><p>queries</p></li></Link>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>logout</p>
              </li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar
