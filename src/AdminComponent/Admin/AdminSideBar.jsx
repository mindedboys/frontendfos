import React from "react";
import { Dashboard, ShoppingBag } from "@mui/icons-material";
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";
import WalletIcon from '@mui/icons-material/Wallet';
import PaymentsIcon from '@mui/icons-material/Payments';


const menu =[
    {title:"None",icon:<ShoppingBag />, path:"/none"},
    {title:"Orders",icon:<ShoppingBag />, path:"/orders"},
    {title:"Menu",icon:<ShopTwoIcon />, path:"/menu"},
    {title:"Food Category",icon:<CategoryIcon />, path:"/category"},
    {title:"Ingredients",icon:<FastfoodIcon/>, path:"/ingredients"},
    {title:"Events",icon:<EventIcon/>, path:"/event"},
    {title:"Wallet",icon:<WalletIcon/>, path:"/wallet-payment"},
    {title:"Withdrawal",icon:<PaymentsIcon/>, path:"/Withdrawal"},
    {title:"Restaurant Details",icon:<AdminPanelSettingsIcon/>, path:"/details"},
    {title:"Dashboard",icon:<Dashboard />, path:"/"},
    {title:"Logout",icon:<LogoutIcon/>, path:"/"},
]

export const AdminSideBar = ({handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-width:1080px)")
    const navigate=useNavigate();
    const dispatch =useDispatch();
    
    const handleNavigate=(item)=>{
        navigate(`/admin/restaurants${item.path}`)
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

export default AdminSideBar;