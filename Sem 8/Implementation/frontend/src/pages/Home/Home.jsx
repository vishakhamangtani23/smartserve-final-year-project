import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import RestaurantList from '../../components/Restaurant List/RestaurantList'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryAllRestaurants from '../../components/QueryAllRestaurants/QueryAllRestaurants'
const Home = () => {

  const [category,setCategory] = useState("All")
  return (
    <div>
       <ToastContainer />
      <Header></Header>
      <ExploreMenu category ={category} setCategory={setCategory}></ExploreMenu>
      <FoodDisplay category={category}></FoodDisplay>
      <RestaurantList></RestaurantList>
      <QueryAllRestaurants></QueryAllRestaurants>
      <AppDownload></AppDownload>
    </div>
  )
}

export default Home
