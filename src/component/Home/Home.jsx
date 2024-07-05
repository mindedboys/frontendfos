import React, { useEffect, useState } from "react";
import "./Home.css"
import MultiItemCarousel from "./MultiItemCarousel.jsx";
import RestaurantCard from "../Restaurant/RestaurantCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Actions.js";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action.js";
import ClipLoader from "react-spinners/ClipLoader";
import { searchMenuItem } from "../State/Menu/Action.js";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };




const Home= () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const {restaurant,menu}=useSelector(store => store) 
    const navigate = useNavigate();



useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getAllRestaurantsAction(jwt))
    setLoading(false);
   },800)    
},[])




return(
    <>
     {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <div className='pb-10'>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Delicious Food</p>
                <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Test the convenience:Food, Fast and Delivered.</p>

            </div>
            
            <div className='cover absolute top-0 left-0 right-0'></div>
            <div className="fadout"></div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-grey-400 py-3 pb-10'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <section className='px-5 lg:px-20'>
            <a className='dataItem'  href="/foods">More Restaurants @....</a>    
                <h1 className='text-2xl font-semibold text-gray-400 py-3' >Order From Our Handpicked Favorites</h1> 
            <div className='flex flex-wrap items-center justify-around'>{
                restaurant.restaurants.slice(0,4).map((item)=><RestaurantCard item={item} />)
                }
                </div>    
            </section>
        </div>
      }
   </>   
  )
} 

export default Home