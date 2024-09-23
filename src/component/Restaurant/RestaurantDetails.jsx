import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Label } from "@mui/icons-material";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/Actions";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
import ClipLoader from "react-spinners/ClipLoader";




const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };




const foodTypes = [
{label:"All", value:"all"},
{label:"Vegetarian only", value:"vegetarian"},
{label:"Non-Vegetarian", value:"non_vegetarian"},
{label:"Seasonal", value:"seasonal"},
];




const RestaurantDetails = () => {
    const [loading, setLoading] = useState(false);
    const [foodType, setFoodType] = useState ("all")
    const navigate = useNavigate()
    const dispatch =useDispatch();
    const jwt=localStorage.getItem("jwt")
    const {auth,restaurant,menu}=useSelector(store => store)
    const [selectedCategory,setSelectedCategory]=useState("");
    const{id,city} = useParams();


useEffect (()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getRestaurantById({jwt,restaurantId:id}))    
        dispatch(getRestaurantsCategory({jwt,restaurantId:id}))
    setLoading(false);
    },800)                
},[]);


useEffect(()=>{
       dispatch(
          getMenuItemsByRestaurantId({
            jwt,
            restaurantId:id,
            vegetarian:foodType==="vegetarian",
            nonveg:foodType==="non_vegetarian",
            seasonal:foodType==="seasonal", 
            foodCategory:selectedCategory
         }));
},[selectedCategory,foodType])


const handleFilter = async(e)=>{
    await setFoodType(e.target.value) 
    console.log(e.target.value,e.target.name)
}


const handleFilterCategory = async(e,value) =>{ 
    await setSelectedCategory(value)
    console.log(e.target.value,e.target.name,value)
}


return(
   <>
     {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> : 
    <div className='px-5 lg:px-20'>
            <section>
                 <h3 className='text-gray-500 py-2 mt-10'></h3>
                 <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] rounded-2xl object-cover' 
                            src={restaurant.restaurant?.images[0]} 
                            alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] rounded-2xl object-cover' 
                            src={restaurant.restaurant?.images[1]} 
                            alt="" />
                        </Grid>    
                    </Grid>
                
                 </div>

                 <div className='pt-3 pb-5'>
                    <h1 children="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
                    <p className="text-gray-500 mt-2">{restaurant.restaurant?.description}</p>  
                    
                    <div className='space-y-3- mt-3'>
                    <p className="text-gray-500 flex item-center gap-3 ">
                        <LocationOnIcon/>
                        <span>
                        <div>{restaurant.restaurant?.address.streetAddress} , </div>
                        <div>{restaurant.restaurant?.address.city} ,
                        {restaurant.restaurant?.address.state} -
                        {restaurant.restaurant?.address.postalCode} </div>
                        <div>{restaurant.restaurant?.address.country} </div>
                        </span>
                    </p>
                    <p className="text-gray-500 flex item-center gap-3 mt-2">
                        <CalendarTodayIcon/>
                        <span>
                        {restaurant.restaurant?.openingHours}
                        </span>
                    </p>
                    <p className="text-gray-400 flex item-center gap-3 mt-3">
                        <span className="pr-1">Status-:</span>
                            {restaurant.restaurant?.open?<span className="px-3 py-1 rounded-full bg-green-400
                                text-gray-950">Open</span>:<span className="px-3 py-1 rounded-full bg-red-400
                                text-gray-950">Closed</span>}
                        </p>
                    </div>
                 </div>
            </section>
    <Divider/>
           <section className="pt-[2rem] lg:flex relative">
            <div className="space-y-10 lg:w-[20%] filter">

                <div className="box-space-y-5 lg:sticky top-28">
                    <div>
                        <Typography variant="h5" sx={{paddingBottom:"1rem"}}> Food Type</Typography>
                        <FormControl className="py-10 space-y-5" component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                             {foodTypes.map((item) => (
                               <FormControlLabel 
                               key={item.value}
                                 value={item.value} 
                                 control={<Radio />} 
                                 label={item.value} 
                              />
                            ))}                          
                            </RadioGroup>
                        </FormControl>
                    </div>
            <Divider/>           
    <div>
        <Typography variant="h5" sx={{paddingBottom:"1rem"}}> Food Category</Typography>
         <FormControl className="py-10 space-y-5" component={"fieldset"}>
            <RadioGroup onChange={handleFilterCategory} name="food_category" 
               value={selectedCategory}>
              {restaurant.categories.map((item)=> (
              <FormControlLabel 
                   key={item}
                   value={item.name} 
                   control={<Radio/>} 
                   label={item.name} 
                  /> ))}
         </RadioGroup>
      </FormControl>
</div>
                </div>
            </div>

            <div className="space-y-5 lg:w-[80%] lg:pl-10"> 
{menu.menuItems.map((item) => <MenuCard  item={item} />)}
            </div>
          </section>
        </div>
       }
     </>
    );
};

export default RestaurantDetails