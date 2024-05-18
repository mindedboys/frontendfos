import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { LocalizationProvider,DateTimePicker} from '@mui/x-date-pickers';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAction } from "../../component/State/Restaurant/Actions";


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
    image:"",
    location:"",
    name:"",
    startedAt:null,
    endsAt:null
}


export const Events = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValues,setFormValues]=React.useState(initialValues);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant} = useSelector((store) => store)    
    const navigate = useNavigate();

const handleSubmit = (e) =>{
    e.preventDefault(); 
       dispatch(
            createEventAction({
                        jwt,
                        restaurantId:restaurant.usersRestaurant?.id,
                        data:formValues,
                        
                        }))
        console.log("submit",formValues);
        setFormValues(initialValues);  

    }
const handleFormChange =(e) =>{
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
const handleDateChange =({date,dateType}) =>{
        const formatedDate=dayjs(date).format("MMMM DD, YYYY hh:mm A");
        setFormValues({...formValues,[dateType]:formatedDate}) 
    }


return (
    <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>Create Event</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                      
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="image"
                                label="image URL"
                                variant="outlined"
                                value={formValues.image}
                                onChange={handleFormChange}
                                
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="location"
                                label="Location"
                                variant="outlined"
                                value={formValues.location}
                                onChange={handleFormChange}
                            />
                            </Grid>   
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="name"
                                label="Event Name"
                                variant="outlined"
                                value={formValues.name}
                                onChange={handleFormChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>  
                             <DateTimePicker 
                             renderInput={(props)=><TextField {...props}  />} 
                            label = "Start Date and Time"
                            value ={formValues.startedAt}
                            onChange={(newValue)=>handleDateChange(newValue,"startedAt")
                            } 
                            inputFormat="MM/dd/yyyy hh:mm a"
                            className='w-full' 
                            sx ={{width :"100%"}}
                            />                                                
                            </LocalizationProvider> 
                            </Grid>  
                            <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>   
                             <DateTimePicker renderInput={(props)=><TextField {...props}  />} 
                            label = "End Date and Time"
                            value ={formValues.endsAt}
                            onChange={(newValue)=> 
                            handleDateChange(newValue,"endsAt")
                            } 
                            inputFormat="MM/dd/yyyy hh:mm a"
                            className='w-full' 
                            sx ={{width :"100%"}}
                            />                                               
                            </LocalizationProvider> 
                            </Grid>     
                        </Grid>
                        <Box mt={2}>
                             <Button variant="contained" color="primary" type="submit">Submit</Button>       
                        </Box>
                      </form>
                </Box>
            </Modal>
        
        </div>

    )
}

export default Events;