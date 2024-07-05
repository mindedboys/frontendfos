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
    <>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Box className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex 
         justify-between'>     
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
                    Delicious food
                    </li>

                </div>
            
            <div className='flex items-center space-x-2 lg:space-x-10'>
                    <div className='search-filter-container'>                           
                    <SearchBar placeholder="Search..." />                           
                    </div>                     

                <div className='cursor-pointer'>
                 {auth.user ? (
                     <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color:pink.A100}}>
                        {auth.user?.fullName[0].toUpperCase()}
                     </Avatar>
                 ):( 
                     <IconButton onClick={()=>navigate("/account/login")}>
                         <Person /> 
                     </IconButton>)}
                </div>

                <div className=''>
                <IconButton onClick={()=>navigate("/cart")}>
                   <ShoppingCartIcon sx={{fontSize:"1.5rem"}} />
                      <Badge color="primary" badgeContent={cart.cart?.items.length}>                       
                    </Badge>    
                    </IconButton>
                </div>

            </div>

        </Box>
}
</> 
    )
}