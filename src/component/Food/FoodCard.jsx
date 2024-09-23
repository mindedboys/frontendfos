import React from "react";
import "./FoodCard.css";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Card, Chip } from "@mui/material";



const FoodCard = ({food}) =>{
const {menu,restaurant}=useSelector(store => store);
const{id,city,address} = useParams();


const handleNavigateToRestaurant = async() =>{
    if(food.restaurant?.open){
        await Navigate(`/restaurant/${food.restaurant.address.city}/${food.restaurant.name}/${food.restaurant.id}`)
    }
}


return(
    <Card className='FoodCard m-2 w-[18rem] transition-all cursor-pointer hover:scale-90 duration-300'>
            <div onClick={handleNavigateToRestaurant}>
              <img className="h-full w-full object-cover rounded-2xl object-left-top" 
              src={food?.images[0]} alt="" />    
           </div>        
          <div className="textPart bg-black p-3">
            <div className="h1">
          <h1 className="font-semibold">{food.restaurant?.name}</h1>
          </div>
                <div>
                    <p >{food.name}</p>
                    <p className="h3">₹{food.price} for one</p>
                    <p>{food.foodCategory.name}</p> 
               </div>                           
        </div>        
</Card>
    )
} 

export default FoodCard;