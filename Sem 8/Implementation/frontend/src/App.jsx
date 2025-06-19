import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import QueryForm from './pages/QueryForm/QueryForm';
import FeedBackForm from './pages/FeedBackForm/FeedBackForm';
import ChatBot from './pages/ChatBot/ChatBot';
import MyQueries from './pages/MyQueries/MyQueries';
import { ToastContainer } from "react-toastify";
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}></LoginPopup> : <> </>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart showLogin={showLogin} setShowLogin={setShowLogin} />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path="/query-form" element={<QueryForm />} />
          <Route path='/feedback/:billId' element={<FeedBackForm />} />
          <Route path='/chatbot' element={<ChatBot />} />
<Route path='/my-queries' element={<MyQueries />} />
        </Routes>

      </div>
      <Footer></Footer></>
  )
}

export default App
