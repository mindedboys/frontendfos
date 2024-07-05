import React from "react";
import "./FoodCard.css";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Card, Chip } from "@mui/material";



const FoodCard = ({item}) =>{
const {auth,restaurant}=useSelector(store => store);
const{id,city,address} = useParams();


const handleNavigateToRestaurant = async() =>{
    if({item}){
        await Navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
}

        
return(
        <div className='FoodCard w-[18rem] m-2 transition-all cursor-pointer'> 
           <div className="h-[15rem]" onClick={handleNavigateToRestaurant}> 
              <img className="h-full w-full object-cover object-left-top"
                       src={item.images[0]} alt="" />
         </div>        
          <div className="textPart bg-black p-3">
            <div className="h1">
          <h1 className="font-semibold">{item.restaurant?.name}</h1>
          </div>
                <div>
                    <p >{item.name}</p>
                    <p className="h3">₹{item.price} for one</p>
                    <p>{item.foodCategory.name}</p> 
               </div>                           
        </div>   
</div>       
    )
} 

export default FoodCard;