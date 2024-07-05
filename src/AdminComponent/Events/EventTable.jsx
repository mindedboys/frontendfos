import React, { useEffect, useState } from "react";
import { Create, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, getRestaurantsEvents } from "../../component/State/Restaurant/Actions";
import CreateEvents from "./CreateEvents";
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



export const EventTable = () => {
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {restaurant} = useSelector((store) => store)  
const navigate = useNavigate();
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(
        getRestaurantsEvents({
            restaurantId:restaurant.usersRestaurant.id,
            jwt:localStorage.getItem("jwt"),
    }));
    setLoading(false);
   },800)
},[]);


const handleDeleteEvent = async (eventId) =>{
    setLoading(true);
    setTimeout(()=>{
     dispatch(
        deleteEventAction({eventId,jwt}))
    setLoading(false);
    },800)
}

return (
    <>
     {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Box>
            <Card className='mt-1'>
                <CardHeader  
                action={
                   <IconButton onClick={handleOpen} aria-label="settings">
                              <CreateIcon />
                    </IconButton>
                       }
                    title={"Event"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Event ID</TableCell>
                                <TableCell align="left">Images</TableCell>
                                <TableCell align="right">Event Name</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Delete</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.restaurantsEvents.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.images[0]}></Avatar>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.startedAt}</TableCell>
                                    <TableCell align="right">{item.endsAt}</TableCell>
                                    <TableCell align="right"><IconButton color="primary" onClick={()=>handleDeleteEvent (item.id)}><Delete /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                         <CreateEvents/>     
              </Box>
          </Modal>   
        </Box>
}
</>    
    )
}

export default EventTable;