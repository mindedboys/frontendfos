import React, { useEffect, useState } from "react";
import { Create, Delete } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteIngredient, getIngredientsOfRestaurant, updateStockOfIngredient } from "../../component/State/Ingredients/Action";
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



export const IngredientTable = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant,ingredients} = useSelector((store) => store)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


useEffect (()=>{
    setLoading(true);
    setTimeout(()=>{
     dispatch(
        getIngredientsOfRestaurant({
            jwt,
            id:restaurant.usersRestaurant.id
        }))
    setLoading(false);
    },800)       
},[])


const handleDeleteIngredient = async (ingredientId) =>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(deleteIngredient({ingredientId,jwt}))
    setLoading(false);
    },800)
}


const handleUpdateStoke = async (id) =>{
    setLoading(true);
    setTimeout(()=>{
    dispatch(updateStockOfIngredient({id,jwt}))
    setLoading(false);
},800)
}




return (
    <>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Box>
            <Card className='mt-1 px-2'>
                <CardHeader  action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        }
                    title={"Ingredients"}
                    sx={{ pt: 3, alignItems: "center" }}
                />
                <h7 className="text-yellow-400">Ingredient are connected to food then First Delete Food</h7>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Delete</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.ingredients.map((item) => (
                                <TableRow className="hover:scale-95 duration-300"
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">{item.category.name}</TableCell>
                                    <TableCell align="right">
                                    <Button onClick={()=>handleUpdateStoke(item.id)}>{item.inStoke?<span className="px-5 py-2 rounded-full bg-green-400
                                             text-gray-950">In-Stoke</span>:<span className="px-5 py-2 rounded-full bg-red-400
                                             text-gray-950">Out-of-Stoke</span>}</Button>
                                    </TableCell>                       
                                    <TableCell align="right"><IconButton color="primary" onClick={()=>handleDeleteIngredient(item.id)}><Delete /></IconButton></TableCell> 
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
                           <CreateIngredientForm />
                </Box>
            </Modal>
        </Box>
    }    
</>        
    )
}

export default IngredientTable;