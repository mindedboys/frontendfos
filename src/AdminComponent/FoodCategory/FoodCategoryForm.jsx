import { Box, Button, CircularProgress, Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/State/Restaurant/Actions";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


const initialValues={
    categoryName:"",
    images:[],
}



const CreateFoodCategoryForm = () =>{
const [loading, setLoading] = useState(false);
const [uploadImage,setUploadImage] = useState(false);
const jwt = localStorage.getItem("jwt");
const {restaurant} = useSelector((store) =>store)
const dispatch = useDispatch()     
const navigate = useNavigate();


const formik = useFormik({
    initialValues,onSubmit:(values)=>{
            const reqData ={ 
                name: values.categoryName,
                images:values.images, 
            }
            setLoading(true);
            setTimeout(()=>{
            dispatch(createCategoryAction({jwt,reqData}))
            setLoading(false);
        },800)      
    }})

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        setUploadImage(true)
        const image = await uploadImageToCloudinary(file)
        formik.setFieldValue("images", [...formik.values.images, image])
        setUploadImage(false)
    };
    
    const handleRemoveImage = async (index) => {
        const updatedImages = [...formik.values.images]
        await updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages)
    };




return(
    <div className=''>
        {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
           <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
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
                                id="categoryName"
                                name="categoryName"
                                label="Food Category"
                                variant="outlined"
                                value={formik.values.categoryName}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        </Grid>
                        <Box mt={2}>    
                           <Button variant="contained" type="submit">Create</Button> 
                        </Box>               
                    </form>   
                </div> 
             }         
        </div>
    )
}

export default CreateFoodCategoryForm;

