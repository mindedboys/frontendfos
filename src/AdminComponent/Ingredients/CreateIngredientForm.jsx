import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient, createIngredientCategory } from "../../component/State/Ingredients/Action";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


const CreateIngredientForm = () =>{
const [loading, setLoading] = useState(false);    
const {restaurant,ingredients} = useSelector((store) => store)    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const[formData,setFormData] = useState ({name:"",categoryId:""}) 


const handleSubmit = async (e) =>{
e.preventDefault();
    const data ={
        ...formData,
        restaurantId: restaurant.usersRestaurant.id
        }
        setLoading(true);
        setTimeout(()=>{
 dispatch(createIngredient({data,jwt}))
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
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
         <form className='space-y-5' onSubmit={handleSubmit}>
                            <TextField fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formData.name}
                            />
                     <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="categoryId"
                                    value={formData.categoryId}
                                    label="Category"
                                    onChange={handleInputChange}
                                    name="categoryId"
                                >
                                   {ingredients.category.map((item)=>(
                                     <MenuItem value={item.id}>{item.name}</MenuItem>
                                   ))}
                                </Select>
                            </FormControl>          
               <Button variant="contained" type="submit">Create</Button>             
          </form>   
        </div>
       }      
    </div>
    )
}

export default CreateIngredientForm;

