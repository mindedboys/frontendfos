import {Avatar, Box,Button,Card,CardHeader,Chip,IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteFoodAction, getAllFoodAction, updateMenuItemsAvailability } from "../../component/State/Menu/Action";
import { Delete } from "@mui/icons-material";


const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8de4d3", 
};


export const FoodTable = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth,menu} = useSelector((store) => store);


useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getAllFoodAction(jwt))
    setLoading(false);
   },800)    
},[])



const handleUpdateAvailability = (foodId) =>{
  setLoading(true);
  setTimeout(()=>{
  dispatch(updateMenuItemsAvailability({foodId,jwt}))
  setLoading(false);
},800)    
}


return (
  <Box>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
      <Card className="mt-1 px-2">
        <CardHeader title={"All Food"} className="px-5" />
        <TableContainer component={Paper}  className="px-3" >
          <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Food_ID</TableCell>
                <TableCell align="left">Rest_ID</TableCell>
                <TableCell align="left">Rest_FullName</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Food_Name</TableCell>
                <TableCell align="right">Category_Name</TableCell>
                <TableCell align="right">Food_Price</TableCell>
                <TableCell align="right">Ingredients_Name</TableCell>
                <TableCell align="right">Food_Creation_Date</TableCell>
                <TableCell align="right">Is_Vegetarian</TableCell>
                <TableCell align="right">Is_Seasonal</TableCell>                
                <TableCell align="right">Food_Availability_Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.foods.map((item) => (
                <TableRow className="hover:scale-95 duration-300"
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                   <TableCell align="left">{item.id}</TableCell> 
                   <TableCell align="left">{item.restaurant?.id}</TableCell>
                   <TableCell align="left">{item.restaurant?.name}</TableCell>
                    <TableCell component="th" scope="row">
                      <Avatar src={item.images[0]}></Avatar>
                    </TableCell>
                   <TableCell align="right">{item.name}</TableCell>
                   <TableCell align="right">{item.foodCategory.name}</TableCell>
                   <TableCell align="right">₹{item.price}</TableCell>
                   <TableCell align="right">
                        {item.ingredients.map((ingredient)=><Chip label={ingredient.name} />)}
                   </TableCell>
                   <TableCell align="right">{item.creationDate}</TableCell>
                   <TableCell align="right">
                     <p className="text-gray-400 flex item-center gap-3 mt-3">
                        {item.vegetarian?<span className="px-3 py-1 text-green-400
                        text-gray-950">YES</span>:<span className="px-3 py-1 text-red-400
                        text-gray-950">NO</span>}
                     </p>
                    </TableCell>
                   <TableCell align="right">
                     <p className="text-gray-400 flex item-center gap-3 mt-3">
                        {item.seasonal?<span className="px-3 py-1 text-green-400
                        text-gray-950">YES</span>:<span className="px-3 py-1 text-red-400
                        text-gray-950">NO</span>}
                     </p>
                    </TableCell>
                   <TableCell align="right">
                      <Button onClick={()=>handleUpdateAvailability(item.id)}>{item.available?<span className="px-5 py-2 rounded-full bg-green-400
                        text-gray-950">In-Stoke</span>:<span className="px-5 py-2 rounded-full bg-red-400
                        text-gray-950">Out-of-Stoke</span>}</Button>    
                   </TableCell>
                   </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      }
    </Box>
  );
};

export default FoodTable;
