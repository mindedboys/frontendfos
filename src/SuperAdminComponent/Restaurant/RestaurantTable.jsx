import {Avatar,AvatarGroup,Box,Button, Card, CardHeader,Chip, IconButton, Menu, MenuItem, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteRestaurant, getAllRestaurantsAction, updateRestaurantStatus } from "../../component/State/Restaurant/Actions";


const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8de4d3", 
};


export const RestaurantTable = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);


useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getAllRestaurantsAction (jwt))
    setLoading(false);
   },800)    
},[])

const handleDeleteRestaurant = (restaurantId)=>{ 
  setLoading(true);
  setTimeout(()=>{
           dispatch(deleteRestaurant({restaurantId,jwt}))
  setLoading(false);
   },800)
}

const handleRestaurantStatus = async () =>{
  setLoading(true);
  setTimeout(()=>{    
dispatch(updateRestaurantStatus({
  restaurantId:restaurant.usersRestaurant.id,
  jwt:localStorage.getItem("jwt")
}))
setLoading(false);
},800)
}

return (
  <Box>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
      <Card className="mt-1">
        <CardHeader title={"All Restaurants"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Cuisine Type</TableCell>
                <TableCell align="right">Registrated Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.restaurants.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="right"><Avatar src={item.images[0]} /></TableCell>
                  <TableCell align="right"><p>{item.name}</p></TableCell>
                  <TableCell align="right">{item.owner.email}</TableCell>
                  <TableCell align="right">
                    <p>{item.owner.mobile}</p>
                    <p>{item.contactInformation.mobile}</p>
                    </TableCell>
                  <TableCell align="right">
                    <div>{item.address.streetAddress},</div>
                    {item.address.city}, {item.address.state} -{" "}
                    {item.address.postalCode},{" "}
                    {item.address.country}
                  </TableCell>
                  <TableCell align="right">{item.cuisineType}</TableCell>
                  <TableCell align="right">{item.registrationDate}</TableCell>
                  <TableCell align="right">
                     <p className="text-gray-400 flex item-center gap-3 mt-3">
                        {item.open?<span className="px-3 py-1 rounded-full bg-green-400
                        text-gray-950">Open</span>:<span className="px-3 py-1 rounded-full bg-red-400
                        text-gray-950">Closed</span>}
                     </p>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteRestaurant(item.id)}
                    >
                      <Delete />
                    </IconButton>
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

export default RestaurantTable;
