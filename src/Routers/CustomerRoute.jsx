import React, { useState } from "react";
import {Navbar} from '../component/Navbar/Navbar'; 
import { Route, Routes } from "react-router-dom";
import Home from '../component/Home/Home';
import RestaurantDetails from '../component/Restaurant/RestaurantDetails';
import Cart from '../component/Cart/Cart';
import Profile from "../component/Profile/Profile";
import Auth from "../component/Auth/Auth";
import { PaymentSuccess } from "../component/PaymentSuccess/PaymentSuccess";
import Food from "../component/Food/Food";
import SearchBar from "../component/SearchBar/SearchBar";
import ResetPassword from "../component/Auth/ResetPassword";
import ForgotForm from "../component/Auth/ForgotForm";

export const CustomerRoute = () =>{

const[searchData,setSearchData]=useState('');      

const handleSearchData=(data)=>{
    console.log("-------",data);
        setSearchData(data);
      }
    
console.log("=======",searchData);

    return(
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/:register' element={<Home/>} />
                <Route path='/foods' element={<Food searchData={searchData}/>} />
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/my-profile/*' element={<Profile/>} />
                <Route path='/payment/success/:id' element={<PaymentSuccess/>} />
                <Route path='/search' element={<SearchBar onSearch={handleSearchData}/>} />
                <Route path='/account/reset/:id' element={<ResetPassword/>} />
            </Routes>
            <Auth />
        </div>
    );
};

export default CustomerRoute