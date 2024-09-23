import React, { useState } from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction, Draw, title } from "@mui/icons-material";
import { Divider, Drawer, icon, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";



const menu =[
 {title:"Orders", icon:<ShoppingBagIcon/> },
 {title:"Favorites", icon:<FavoriteIcon />},
 {title:"Address", icon:<AddReaction/>},
 {title:"wallet-Payment", icon:<AccountBalanceWalletIcon/>},
 {title:"Notification", icon:<NotificationsActiveIcon/>},
 {title:"Events", icon:<EventIcon/>},
 {title:"Logout", icon:<LogoutIcon/>}
];



const ProfileNavigation = ({open, handleClose}) => {
    const [loading, setLoading] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch=useDispatch()


const handleNavigate = async (item) =>{
    if(item.title==="Logout"){        
        await dispatch(logout());
        await navigate("/") 
    }
    else
        await navigate (`/my-profile/${item.title.toLowerCase()}`)     
    }



return (
    <div>
        <Drawer variant={isSmallScreen?"temporary":"permanent"}  
            onClose={handleClose} 
            open={isSmallScreen? open:true}  
            anchor="left" 
            sx={{zIndex: -1, position:"sticky"}}>
        </Drawer>
            <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col 
            justify-center text-xl gap-8 pt-16">
{menu.map((item,i)=><>
<div onClick={()=> handleNavigate(item)} className="px-5 flex items-center space-z-5 cursor-pointer hover:scale-90 duration-300">
    {item.icon}
    <span>
        {item.title}
    </span>
</div>
{i!== menu.length-1 && <Divider/>}
</>)}
        </div>
    </div> 
   );
};

export default ProfileNavigation