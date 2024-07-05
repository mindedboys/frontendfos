import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createIngredientCategory } from "../../component/State/Ingredients/Action";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };




const CreateIngredientCategoryForm = () =>{
const [loading, setLoading] = useState(false);    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {restaurant} = useSelector((store) => store)
const[formData,setFormData] = useState ({name:""})
 

const handleSubmit = (e) =>{
e.preventDefault();
const data = {
                name:formData.name, 
                restaurantId:restaurant.usersRestaurant.id,
             }
setLoading(true);
setTimeout(()=>{
dispatch(createIngredientCategory({data,jwt}))
setLoading(false);
},800)
}

const handleInputChange = async(e) =>{
    const {name,value}=e.target
   await setFormData ({
        ...formData,[name]:value
    })
    }


return(
        <div className=''>
             {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
           <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
         <form className='space-y-5' onSubmit={handleSubmit}>
                            <TextField fullWidth
                                id="name"
                                name="name"
                                label="Category"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formData.name}
                            />
               <Button variant="contained" type="submit">Create</Button>             
        </form>   
         </div>     
        } 
        </div>
    )
}

export default CreateIngredientCategoryForm;

