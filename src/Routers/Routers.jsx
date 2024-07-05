import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoute } from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import SuperAdmin from "../SuperAdminComponent/SuperAdmin/SuperAdmin";



export const Routers = () => {
    return (
        
        <Routes>
            <Route path='/admin/*' element={<SuperAdmin/>}></Route>
            <Route path='/admin/restaurants/*' element={<AdminRoute/>}></Route>
            <Route path='/*' element={<CustomerRoute />}></Route>
        </Routes>
    )
}

export default Routers;