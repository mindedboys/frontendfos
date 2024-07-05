import { Box, Button, Card, Divider, Grid, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { AddLocation } from "@mui/icons-material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getUsersOrders } from "../State/Order/Action";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {Eventcss} from "../Profile/Event.css";
import Pagination from "../Util/Pagination";
//import * as yup from "yup";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};


const initialValues = {
    streetAddress: "",
    state: "",
    postalCode: "",
    city: "",
}

/*
const validationSchema =yup.object.shape({ 
    streetAdreess:yup.required("Street address is required"),
    state:yup.string().required("state is required"),
    pincode:yup.number().required("pincode is required"),
    city:yup.string().required("city is required")
    
 })
*/
//const items =[1,1];

const Cart = () => {    
    const [loading, setLoading] = useState(false);
    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt")
    const [open, setOpen] = React.useState(false);
    const { cart, auth, order} = useSelector(store => store)
    const dispatch = useDispatch();
    
    //Pagination     
    const[currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(2);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex =lastPostIndex - postsPerPage;
    const currentPosts =auth.user?.address.slice(firstPostIndex,lastPostIndex);


useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getUsersOrders(jwt))
    setLoading(false);
    },800)    
},[auth.jwt])
    
const handleSubmit = async(values) => {
         const data = {
             jwt:localStorage.getItem("jwt"),
             order:{
                 restaurantId:cart.cartItems[0].food?.restaurant.id,
                 deliveryAddress:{
                     fullName:auth.user?.fullName,
                     streetAddress:values.streetAddress,
                     city:values.city,
                     state:values.state,
                     postalCode:values.postalCode,
                     country:"India"
                 }
             } 
         }
         setLoading(true);
         setTimeout(()=>{
              dispatch(createOrder(data));  
        setLoading(false);
        },800)
    };

const createOrderUsingSelectedAddress = async(values) => { 
    const data = {
        jwt:localStorage.getItem("jwt"),
        order:{
            restaurantId:cart.cartItems[0].food?.restaurant.id,
            deliveryAddress:values
        }
    }
    setLoading(true);
    setTimeout(()=>{   
        dispatch(createOrder(data));
    setLoading(false);
    },800)
};


return (
        <>
            <main className='lg:flex justify-between'>
            {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems?.map((item) => <CartItem item={item} />)}
                    <Divider />

                    <div className="billlDetails px-5 text-5m ">
                        <p className="font-extralight py-5"> Bill Details</p>
                        <div className="sapce-y-3">
                            <div className="flex justify-between text-gray-400">
                                <p>Item Total</p>
                                <p>₹{cart.cart?.total}</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Delivery Fee</p>
                                <p>₹50</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>GST and Restaurant Charges</p>
                                <p>₹33</p>
                            </div>
                            <Divider />
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <p>Total Bill</p>
                            <p>₹{cart.cart?.total + 33 + 50}</p>
                        </div>
                    </div>
                </section>
               }
                <Divider orientation="vertical" flexItem />
                {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {currentPosts?.map((item) =>
                            (<AddressCard handleSelectAddress={createOrderUsingSelectedAddress}
                                item={item} showButton={true}
                            />))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocation />
                                <div className="space-y-3 tex-gray-500">
                                    <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                                    <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                        <Pagination        
                              totalPosts={auth.user?.address.length}
                              postsPerPage={postsPerPage}
                              currentPage={currentPage}
                              setCurrentPage={setCurrentPage}
                          />
                    </div>
                </section>
}    
            </main>
            {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :      
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        //validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                  <Form>          
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="streetAddress"
                                    label="streetAddress"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name="state"
                                    label="state"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>    
                            <Grid item xs={6} >
                                <Field
                                    as={TextField}
                                    name="city"
                                    label="city"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="postalCode"
                                    label="postalCode"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                           <Button fullWidth variant="contained" type="submit" color="primary" >Deliver Here</Button>  
                        </Grid>
                        </Grid>
                    </Form>    
               </Formik>
         </Box>
    </Modal>
}
        </>
    );

};

export default Cart