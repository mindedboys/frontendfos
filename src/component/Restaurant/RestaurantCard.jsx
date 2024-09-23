import { Card, Chip, IconButton } from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTOFavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };




const RestaurantCard = ({item}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch =useDispatch();
    const jwt=localStorage.getItem("jwt")
    const {auth}=useSelector(store => store)
    

const handleAddToFavorite = async() =>{
    setLoading(true);
    setTimeout(()=>{
         dispatch(addTOFavorite({restaurantId:item.id,jwt}))
    setLoading(false);
    },800)     
}


const handleNavigateToRestaurant = async() =>{
    if(item.open){
        await navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
}

return(
    <>
      {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Card className='m-2 w-[18rem] hover:scale-90 duration-300'>
            <div onClick={handleNavigateToRestaurant} 
                 className= {`${true?'cursor-pointer':"cursor-not-allowed"} relative`}>
      <img className="w-full h-[15rem] object-cover rounded-2xl" src={item.images[1]} alt="" />
      <div className="bg-gradient-to-t from-black from-1% to-transparant to-40% rounded-2xl w-full h-full absolute top-0"></div>  

    <Chip size="small" 
           className="absolute top-2 left-2" 
           color={item.open?"success":"error"} 
           label={item.open?"open":"closed"}>
    </Chip>
        </div>
        
         <div className="p-4 textPart lg:flex w-full justify-between">
            <div className="space-y-1">
                <p className="font-bold text-lg cursor-pointer">
                    {item.name?.length>25
                   ? item.name.substring(0, 25) + "..."
                   : item.name}
                </p>
                <p className="text-gray-500 text-sm">{item.cuisineType}</p>
                <p className="text-gray-500 text-sm">
                {item.address?.streetAddress},{item.address?.city}-{item.address?.postalCode},{item.address?.state}
                </p>
            </div>
            <div>
                <IconButton onClick={handleAddToFavorite}>
                    {isPresentInFavorites(auth.favorites,item)?<FavoriteIcon color="primary"/>:<FavoriteBorderIcon/>} 
                </IconButton>
            </div>    
         </div>
        </Card>
       }
 </>      
    )
}

export default RestaurantCard