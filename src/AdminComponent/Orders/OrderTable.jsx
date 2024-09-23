import {Avatar,AvatarGroup,Box,Button, Card, CardHeader,Chip, IconButton, Menu, MenuItem, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteOrderAction,fetchRestaurantsOrder,updateOrderStatus,} from "../../component/State/Restaurant Order/Action";
import { Delete } from "@mui/icons-material";
import ClipLoader from "react-spinners/ClipLoader";


const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8de4d3", 
};


const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Prepared", value: "PREPARED" },
  { label: "Canceled", value: "CANCELED" },
];

export const OrderTable = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const open = Boolean(anchorEl);


  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
      dispatch(fetchRestaurantsOrder({jwt,restaurantId: restaurant.usersRestaurant.id,}));
      setLoading(false);
    },800)
  }, [dispatch, jwt, restaurant.usersRestaurant.id]);


  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder = (orderStatus) => {
    setLoading(true);
    setTimeout(()=>{
     dispatch(
        updateOrderStatus({ orderId: selectedOrderId, orderStatus, jwt }));
    setLoading(false);
  },800)
    handleClose();
  };

  const handleRowClick = (rowData) => {
    setSelectedOrderId(rowData.id);
  };


return (
  <Box>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 4, alignItems: "center" }} />
        <TableContainer component={Paper} sx={{ px: 2, alignItems: "center" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order_ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Food_Name</TableCell>
                <TableCell align="right">Food_Price</TableCell>
                <TableCell align="right">Ingredients_Name</TableCell>
                <TableCell align="right">Customer_Name</TableCell>
                <TableCell align="right">Customer_Mobile</TableCell>
                <TableCell align="right">Customer_Address</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow className="hover:scale-95 duration-300"
                  key={item.id}
                  selected={item.id === selectedOrderId}
                  onClick={() => handleRowClick(item)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem, index) => (
                        <Avatar key={index} src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, index) => (
                      <p key={index}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">₹{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, index) => (
                      <div key={index}>
                        {orderItem.ingredients.map((ingredient, i) => (
                          <Chip key={i} label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.customer.fullName}</TableCell>
                  <TableCell align="right">{item.customer.mobile}</TableCell>
                  <TableCell align="right">
                    <div>{item.deliveryAddress.streetAddress},</div>
                    {item.deliveryAddress.city}, {item.deliveryAddress.state} -{" "}
                    {item.deliveryAddress.postalCode},{" "}
                    {item.deliveryAddress.country}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateOrder(status.value)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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

export default OrderTable;
