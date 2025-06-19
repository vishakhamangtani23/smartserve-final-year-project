import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore illum assumenda ratione rem voluptate incidunt porro voluptates quasi aut. Nisi!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>
            SMARTSERVE
          </h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>9359697403</li>
            <li>contact@tomato.com</li>
          </ul>
        </div></div>
      <hr />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Tomato. All rights reserved.
      </p>
    </div>
  )
}


export default Footer
