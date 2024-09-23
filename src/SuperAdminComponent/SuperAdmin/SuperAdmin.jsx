import React from "react";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import RestaurantDashboard from "../Dashboard/Dashboard";
import SuperAdminSideBar from "./SuperAdminSideBar";
import Restaurants from "../Restaurant/Restaurants";
import Users from "../Users/Users";
import Foods from "../Foods/Foods";
import Withdrawal from "../Withdrawal/Withdrawal";
import PaymentDetails from "../PaymentDetails/PaymentDetails";
import MyWallet from "../MyWallet/MyWallet";


export const SuperAdmin = () => {
    const handleClose=()=>{
    }

return (
    <div className='lg:flex justify-between'>
        <div>        
            <SuperAdminSideBar handleClose={handleClose} />       
        </div> 
            <div className='lg:w-[82%]'>
                <Routes>
                    <Route path='/' element={<RestaurantDashboard/>} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/allrestaurant' element={<Restaurants/>} />
                    <Route path='/allfood' element={<Foods />} />    
                    <Route path='/allusers' element={<Users/>} /> 
                    <Route path='/mywallet' element={<MyWallet/>} /> 
                    <Route path='/useraccount' element={<PaymentDetails/>} /> 
                    <Route path='/withdrawal' element={<Withdrawal/>} />    
                </Routes>
            </div>  
        </div>
    )
}

export default SuperAdmin;