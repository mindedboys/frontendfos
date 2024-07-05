import React, { useEffect, useState } from "react";
import { Create, Delete } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateFoodCategoryForm from "./FoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction, getRestaurantsCategory } from "../../component/State/Restaurant/Actions";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
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

export const FoodCategoryTable = () => {
    const [loading, setLoading] = useState(false);
    const {restaurant} = useSelector((store) =>store)
    const dispatch = useDispatch()
    const jwt =localStorage.getItem("jwt")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect (()=>{
        setLoading(true);
        setTimeout(()=>{
             dispatch(
                 getRestaurantsCategory({
                     jwt,
                     restaurantId:restaurant.usersRestaurant?.id,
             }));
        setLoading(false);
        },800)     
    },[]);


const handleDeleteCategory = async (categoryId) =>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(deleteCategoryAction({categoryId,jwt}))
    setLoading(false);
    },800)
}
    

    return (
        <>
        {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Box>            
            <Card className='mt-1'>
                <CardHeader action={
                    <IconButton  onClick={handleOpen} aria-label="settings">
                        <CreateIcon />
                    </IconButton>
                }
                    title={"Food Category"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Food Id</TableCell>
                                <TableCell align="left">Images</TableCell>
                                <TableCell align="left">Food Name</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.images[0]}></Avatar>
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="right"><IconButton color="primary" onClick={()=>handleDeleteCategory(item.id)}><Delete /></IconButton></TableCell>
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
                           <CreateFoodCategoryForm />     
                </Box>
            </Modal>

        </Box>
    } 
 </>   
)
}

