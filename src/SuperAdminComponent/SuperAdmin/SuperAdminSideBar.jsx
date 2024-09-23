import React from "react";
import { Dashboard, ShoppingBag } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import WalletIcon from '@mui/icons-material/Wallet';


const menu =[
    {title:"Dashboard",icon:<Dashboard />, path:"/"},
    {title:"Orders",icon:<ShoppingBag />, path:"/orders"},
    {title:"Restaurants",icon:<RestaurantIcon />, path:"/allrestaurant"},
    {title:"Foods",icon:<FastfoodIcon />, path:"/allfood"},
    {title:"Users",icon:<PersonIcon />, path:"/allusers"},
    {title:"MyWallet",icon:<WalletIcon />, path:"/mywallet"},
    {title:"Accounts",icon:<AccountBalanceWalletIcon />, path:"/useraccount"},
    {title:"Withdrawal",icon:<PaymentsIcon />, path:"/withdrawal"},
    {title:"Logout",icon:<LogoutIcon/>, path:"/"},
]


export const SuperAdminSideBar = ({handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-width:1080px)")
    const navigate=useNavigate();
    const dispatch =useDispatch();
    
    const handleNavigate=(item)=>{
        navigate(`/admin${item.path}`)
        if(item.title==="Logout"){
            navigate("/")
            dispatch(logout())
            handleClose()    
        }
    }

    
return (
    <div>
        <>
           <Drawer 
           variant={isSmallScreen?"temporary":"permanent"}
           onClose={handleClose} 
           open={true}
           anchor="left" 
           sx={{zIndex:1}}>
             <div className='w-[70vw] lg:w-[18vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem] cursor-pointer'>
                {menu.map((item,i)=><>
                <div onClick={()=>handleNavigate(item)} className='px-5 flex items center gap-5 cursor-poimter hover:scale-90 duration-300'>
                    {item.icon}
                    <span>{item.title}</span>
                </div>
            {i!==menu.length-1 && <Divider/>}    
                </>)}
             </div>          
           </Drawer>
        </>
    </div>
)
}

export default SuperAdminSideBar;