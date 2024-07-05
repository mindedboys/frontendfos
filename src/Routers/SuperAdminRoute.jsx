import React from "react";
import SuperAdmin from "../SuperAdmin/SuperAdmin";


const SuperAdminRoute = () =>{

 return (
    <div>
        <Routes>
            <Route path='/*' element={<SuperAdmin />} />
        </Routes>
    </div>
 )   
}