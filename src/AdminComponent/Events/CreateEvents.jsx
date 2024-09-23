import { Box, Button, CircularProgress, Grid, IconButton, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAction } from "../../component/State/Restaurant/Actions";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { EventTable } from "./EventTable";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from "../util/UploadToCloudaniry";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
};


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };



const initialValues={
    name:"",
    location:"",
    images:[],
    startedAt:"",
    endsAt:""
}


export const CreateEvents = () => {
    const [loading, setLoading] = useState(false);
    const [uploadImage,setUploadImage] = useState(false);
    const jwt = localStorage.getItem("jwt");
    const {restaurant} = useSelector((store) => store)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

const formik = useFormik({
    initialValues,onSubmit:(values)=>{
       // e.preventDefault();
            const data ={ 
                name:values.name, 
                location:values.location,
                images:values.images,
                startedAt:values.startedAt,
                endsAt:values.endsAt, 
            }
    setLoading(true);
    setTimeout(()=>{    
       dispatch(createEventAction({jwt,restaurantId:restaurant.usersRestaurant?.id,data}))
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

//const handleFormChange =(e) =>{
//        setFormValues({...formValues,[e.target.name]:e.target.value})
 //   }
//const handleDateChange = (dateType) =>{
//        const formatedDate=dayjs('05/31/2024').format('MMMM D, YYYY h:mm A');
//        setFormValues({...formValues,[dateType]:formatedDate}) 
//    }


return (
    <div className='p-5'>
         {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
                <Box sx={style}>
                    <h1 className='font-bold text-2xl text-center py-2'>Add New Event</h1>
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
                                name="name"
                                label="Event Name"
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="location"
                                label="Location"
                                variant="outlined"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="startedAt"
                                label="Started Date"
                                variant="outlined"
                                value={formik.values.startedAt}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                               <TextField fullWidth
                                name="endsAt"
                                label="End Date"
                                variant="outlined"
                                value={formik.values.endsAt}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        </Grid>
                        <Box mt={2}>
                             <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>       
                        </Box>
                      </form>
                </Box>
}     
        </div>
    )
}

export default CreateEvents;