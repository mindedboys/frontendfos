import React, { useEffect, useState } from "react";
import { Create, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from "../../component/State/Menu/Action";
import ClipLoader from "react-spinners/ClipLoader";

const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


export const MenuTable = () => {
const [loading, setLoading] = useState(false);    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {restaurant,ingredients,menu} = useSelector((store) => store)  
const navigate = useNavigate();



useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(
        getMenuItemsByRestaurantId({
            restaurantId:restaurant.usersRestaurant.id,
            jwt:localStorage.getItem("jwt"),
            vegetarian:false,
            nonveg:false,
            seasonal:false, 
            foodCategory:"",
    }));
    setLoading(false);
},800)  
},[]);

const handleUpdateAvailability = (foodId) =>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(updateMenuItemsAvailability({foodId,jwt}))
    setLoading(false);
},800)    
}

const handleDeleteFood=(foodId) =>{
    setLoading(true);
    setTimeout(()=>{  
dispatch(deleteFoodAction({foodId,jwt}))
setLoading(false);
},800)
}

return (
        <Box>
            {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
            <Card className='mt-1'>
                <CardHeader  action={
          <IconButton onClick={()=>navigate("/admin/restaurants/add-menu")} aria-label="settings">
            <CreateIcon />
          </IconButton>
        }
                    title={"All Menu"}
                    sx={{ px: 4, alignItems: "center" }}
                />
                <TableContainer component={Paper} sx={{ px: 4, alignItems: "center" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Food ID</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="right">Food Name</TableCell>
                                <TableCell align="right">Food Category</TableCell>
                                <TableCell align="right">Ingredients Name</TableCell>
                                <TableCell align="right">Food Price</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Delete</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow className="hover:scale-95 duration-300"
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.images[0]}></Avatar>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.foodCategory.name}</TableCell>
                                    <TableCell align="right">
                                        {item.ingredients.map((ingredient)=><Chip label={ingredient.name} />)}
                                    </TableCell>
                                    <TableCell align="right">₹{item.price}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={()=>handleUpdateAvailability(item.id)}>{item.available?<span className="px-5 py-2 rounded-full bg-green-400
                                             text-gray-950">In-Stoke</span>:<span className="px-5 py-2 rounded-full bg-red-400
                                             text-gray-950">Out-of-Stoke</span>}</Button>    
                                    </TableCell>
                                    <TableCell align="right"><IconButton color="primary" onClick={()=>handleDeleteFood(item.id)}><Delete /></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            }   
        </Box>
    )
}

export default MenuTable;