import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css"
import { navigate, useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { topMeal } from "../Home/topMeal"; 
import ClipLoader from "react-spinners/ClipLoader";
import SearchBar from "../SearchBar/SearchBar";
import PlaceIcon from '@mui/icons-material/Place';


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



export const Navbar = () =>{
    const [loading, setLoading] = useState(false);
    const{auth, cart, menu} = useSelector((store) => store);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const jwt=localStorage.getItem("jwt")


const handleAvatarClick=() =>{
        if(auth.user?.role==="ROLE_CUSTOMER"){
            setLoading(true);
            setTimeout(()=>{
            navigate("/my-profile")  // if user login with ROLE_CUSTOMER then go /my-profile
            setLoading(false);
            },800)
        }
       else if(auth.user?.role==="ROLE_RESTAURANT_OWNER"){
            setLoading(true);
            setTimeout(()=>{
            navigate("/admin/restaurants") // if user login as ROLE_RESTAURANT_OWNER then go /admin/restaurant dashborad
            setLoading(false);
            },800)
        }
        else{
            setLoading(true);
            setTimeout(()=>{
            navigate("/admin") // if user login as ROLE_RESTAURANT_OWNER then go /admin/restaurant dashborad
            setLoading(false);
            },800)
        }
    }





return(
    <div className=""> 

    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Box className='px-5 z-50 shadow-md py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>     
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4 '>
                    <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2xl hover:scale-95 duration-300'>
                          Delicious food
                    </li>
                </div>
            
            <div className='flex items-center space-x-2 lg:space-x-10'>
                    <div className="search">
                        <p onClick={()=>navigate("/search")} className="text-xl cursor-pointer hover:scale-95 duration-300"> <PlaceIcon className="searchIcon " sx={{height: 35, width:35}}/> Location</p>
                    </div>

                    <div className='search'>                           
                   <p onClick={()=>navigate("/search")} className="text-xl cursor-pointer hover:scale-95 duration-300"><SearchIcon className="searchIcon " sx={{height: 35, width:35}}/> Search</p>                            
                    </div>                     

                <div className='cursor-pointer hover:scale-90 duration-300'>
                 {auth.user ? (
                     <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color:pink.A100}}>
                       <p> {auth.user?.fullName[0].toUpperCase()}</p> 
                     </Avatar>
                     
                 ):( 
                     <IconButton onClick={()=>navigate("/account/login")}>
                         <Person sx={{height: 40, width:35}}/><p className="text-xl"> Sign in</p> 
                     </IconButton>)}
                </div>

                <div className='hover:scale-90 duration-300'>
                <IconButton onClick={()=>navigate("/cart")}>
                   <ShoppingCartIcon sx={{height: 40, width:35}} />
                      <Badge color="primary" badgeContent={cart.cart?.items.length}><p className="text-xl font-normal"> Cart</p>                       
                    </Badge>    
                    </IconButton>
                </div>

            </div>

        </Box>
}
</div> 
    )
}