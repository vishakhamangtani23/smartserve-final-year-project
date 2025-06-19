import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import axios
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login"); // Default to Login
  const [data, setData] = useState({
    fullname: "",  // Full name for registration
    email: "",     // Email for registration
    phone: "",     // Phone for registration
    dob: "",       // DOB for registration (optional)
    username: "",  // Username for login
    password: ""   // Password for both
  });

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const { url, setUserData, userData } = useContext(StoreContext);

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    console.log(data);
    if (currentState === "Login") {
      newUrl += "/api/user/login";  // Login API endpoint
    } else {
      newUrl += "/api/user/register";  // Register API endpoint
    }

    const response = await axios.post(newUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    });
    console.log(response)
    if (response.status === 200 && response.data.validYN !== 0) {
      console.log(response.data)
      setUserData(response.data);  // Save the token on success
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id);
      console.log(userData)
      setShowLogin(false);
    } else {
      alert("Incorrect Username or Password");
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" &&
            <>
              <input
                type="text"
                name="fullname"
                onChange={onChangeHandler}
                value={data.fullname}
                placeholder='Your Full Name'
                required
              />
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder='Your Email'
                required
              />
              <input
                type="text"
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                placeholder='Your Phone Number'
                required
              />
              <input
                type="date"
                name="dob"
                onChange={onChangeHandler}
                value={data.dob}
                placeholder='Your Date of Birth'
              />
            </>
          }
          {currentState === "Login" &&
            <>
              <input
                type="text"
                name="username"
                onChange={onChangeHandler}
                value={data.username}
                placeholder='Your Username'
                required
              />
            </>
          }
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder='Your Password'
            required
          />
        </div>

        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By signing up, you agree to our terms and conditions.</p>
        </div>

        {currentState === "Login" ?
          <p>Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Sign Up here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
}

export default LoginPopup;
