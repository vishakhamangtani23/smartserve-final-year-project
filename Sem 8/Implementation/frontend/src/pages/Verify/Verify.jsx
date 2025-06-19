import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  console.log(
    success,
    orderId
  );
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyOrder = async () => {
    let response = await axios.post(url + "/api/order/verify", { orderId, success },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );
    console.log(response.data);
    if (response.data.success) {
      navigate("/my-orders")
    }
    else {
      navigate("/")
    }
  }
useEffect(
  () => {
    verifyOrder();
  }, []
)
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
