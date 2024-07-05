import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Event from "../Events/Event";
import RestaurantDetails from "./RestaurantDetails";
import RestaurantDashboard from "../Dashboard/Dashboard";
import CreateMenuForm from "../Menu/CreateMenuForm";
import WalletDetails from "../Wallet/WalletDetails";
import Withdrawal from "../Withdrawal/Withdrawal";


export const Admin = () => {
 
    const handleClose=()=>{

    }

    return (
        <div className='lg:flex justify-between'>
             <div>        
                  <AdminSideBar handleClose={handleClose} />       
             </div> 
             <div className='lg:w-[82%]'>
                <Routes>
                    <Route path='/' element={<RestaurantDashboard/>} />
                    <Route path='/orders' element={<Orders/>} />
                    <Route path='/menu' element={<Menu/>} />
                    <Route path='/category' element={<FoodCategory/>} />
                    <Route path='/ingredients' element={<Ingredients/>} />
                    <Route path='/event' element={<Event/>} />
                    <Route path='/wallet-payment' element={<WalletDetails/>} />
                    <Route path='/Withdrawal' element={<Withdrawal />} />
                    <Route path='/details' element={<RestaurantDetails/>} />
                    <Route path='/add-menu' element={<CreateMenuForm/>} />  
                </Routes>
            </div>  
        </div>
    )
}

export default Admin;