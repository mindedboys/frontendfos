import React from "react";
import CartItem from "../Cart/CartItem";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

export const Favorites = () => {
    const {auth}=useSelector((store) => store)
    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
            <div className='flex flex-warp gap-3 justify-center'>
                {auth.favorites.map((item)=><RestaurantCard item={item}/>)}

            </div>
        </div>
    )
}

export default Favorites