import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/State/Restaurant/Actions";

const CreateFoodCategoryForm = () =>{
const {restaurant} = useSelector((store) =>store)
const dispatch = useDispatch()    
const[formData,setFormData] = useState ({categoryName:"",restaurantId:""}) 

const handleSubmit = () =>{
    const data ={
        name: formData.categoryName,
        restaurantId:{
            id:1
        },
    };
    dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem("jwt")}))
    console.log("create category",data)
}
const handleInputChange = (e) =>{
    const {name,value}=e.target
    setFormData ({
        ...formData,[name]:value
    })
    }


return(
        <div className=''>
           <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
         <form className='space-y-5' onSubmit={handleSubmit}>
                            <TextField fullWidth
                                id="categoryName"
                                name="categoryName"
                                label="Food Category"
                                variant="outlined"
                                value={formData.categoryName}
                                onChange={handleInputChange}
                            />
                           <Button variant="contained" type="submit">Create</Button>             
                    </form>   
                </div>     
            </div>
    )
}

export default CreateFoodCategoryForm;

