import React, { useState } from "react";
import { Button, CircularProgress, Grid, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../component/State/Restaurant/Actions";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


const initialValues ={
    name:"",
    description:"",
    cuisineType:"",
    streetAddress:"",
    city:"",
    state:"",
    postalCode:"",
    country:"",
    email:"",
    mobile:"",
    twitter:"",
    instagram:"",
    facebook:"",
    linkedin:"",
    opingHours:"Mon-Sun :9:00 AM - 10:00 PM",
    images:[]
}



export const CreateRestaurantForm = () => {
const [loading, setLoading] = useState(false);    
const [uploadImage,setUploadImage] = useState(false);    
const dispatch = useDispatch ()
const jwt = localStorage.getItem("jwt") 


const formik = useFormik({
    initialValues,onSubmit:(values)=>{
        const data ={
            name:values.name,
            description:values.description,
            cuisineType:values.cuisineType,
            address:{
                streetAddress:values.streetAddress,
                city:values.city,
                state:values.state,
                postalCode:values.postalCode,
                country:values.country
                 },
            contactInformation:{
                email:values.email,
                mobile:values.mobile,
                instagram:values.instagram,
                twitter:values.twitter,
                facebook:values.facebook,
                linkedin:values.linkedin,   
            },     
            opingHours:values.opingHours,
           images:values.images, 
        };
    setLoading(true);
    setTimeout(()=>{
        dispatch(createRestaurant({data,token:jwt}))
    setLoading(false);
    },800)         
  }, 
})
const handleImageChange = async(e) =>{
  const file = e.target.files[0]
  setUploadImage(true)
  const image=await uploadImageToCloudinary(file)
  formik.setFieldValue("images",[...formik.values.images,image])
  setUploadImage(false)  
};

const handleRemoveImage = async (index)=>{
   const updatedImages=[...formik.values.images]     
   await updatedImages.splice(index,1);
   formik.setFieldValue("images",updatedImages)
};


return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
          {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
            <div className="lg:max-w-4xl">
            <h1 className='font-bold text-2xl text-center py-2'>
                Add New Restaurant
            </h1>
    <form onSubmit={formik.handleSubmit} className='space-y-4'>
       <Grid container spacing={2}>   
          <Grid className='flex flex-wrap gap-5' item xs={12}>
        <input 
            accept='image/*'
            id='fileInput'
            style={{display:"none"}}
            onChange={handleImageChange}
            type="file"
            />
        <label className='relative' htmlFor="fileInput" >
        <span className='w-24 h-24 cursor-pointer flex items-center justify-center 
               p-3 border rounded-md border-gray-400'>
         <AddPhotoAlternateIcon className ='text-white' />      
        </span>
        {
            uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 
            flex justify-center items-center'>
                <CircularProgress />
            </div>
        }
        </label>    
            <div className='flex flex-wrap gap-2'>
{formik.values.images.map((image, index)=><div className="relative">
    <img className='w-24 h-24 object-cover'
    key={index} 
    src={image} 
    alt="" />
    <IconButton  
    size='small'
    sx={{
        position:'absolute',
        top:0,
        right:0,
        outline:"none"
    }}
    onClick={()=>handleRemoveImage(index)}>
        <CloseIcon sx={{fontSize:"1rem"}} />
    </IconButton>
</div>
)}
</div>
  </Grid>
    <Grid item xs={12}>
       <TextField fullWidth
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.name}
          />         
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.description}
          />         
    </Grid>
    <Grid item xs={12} lg={6}>
      <TextField fullWidth
          id="cuisineType"
          name="cuisineType"
          label="Cuisine Type"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.cuisineType}
          />         
    </Grid>  
    <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="opingHours"
          name="opingHours"
          label="Opening Hours"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.opingHours}
          />         
        </Grid>  
        <Grid item xs={12}>
          <TextField fullWidth
          id="streetAddress"
          name="streetAddress"
          label="Street Address"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.streetAddress}
          />         
        </Grid>  
        <Grid item xs={12} lg={3}>
          <TextField fullWidth
          id="city"
          name="city"
          label="City"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.city}
          />         
        </Grid>  
        <Grid item xs={12} lg={3}>
          <TextField fullWidth
          id="state"
          name="state"
          label="State"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.state}
          />         
        </Grid>  
        <Grid item xs={12} lg={3}>
          <TextField fullWidth
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          />         
        </Grid>  
        <Grid item xs={12} lg={3}>
          <TextField fullWidth
          id="country"
          name="country"
          label="Country"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.country}
          />         
        </Grid>       
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
          />         
        </Grid>      
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="mobile"
          name="mobile"
          label="Mobile"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.mobile}
          />         
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="instagram"
          name="instagram"
          label="Instagram"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.instagram}
          />         
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="twitter"
          name="twitter"
          label="Twitter"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.twitter}
          />         
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="facebook"
          name="facebook"
          label="Facebook"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.facebook}
          />         
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField fullWidth
          id="linkedin"
          name="linkedin"
          label="Linkedin"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.linkedin}
          />         
        </Grid>
       </Grid> 
       <Button variant="contained" color="primary" type="submit">Create Restaurant</Button>  
    </form>        
   </div>
   }
 </div>
  )
}

export default CreateRestaurantForm;