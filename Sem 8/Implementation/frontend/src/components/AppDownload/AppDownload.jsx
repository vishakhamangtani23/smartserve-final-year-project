import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const navigate = (path) => {
  const navigate = useNavigate()
  return () => navigate(path)
}
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>
         For better experience Checkout our <br /> ChatBot
      </p>
      <div className="app-download-platforms">
       <button onClick={navigate('/chatbot')}><img src={assets.play_store} alt="" /></button> 
      </div>
    </div>
  )
}

export default AppDownload
