import { Box, Button, Card, Grid, Modal, TextField} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from "react";
import { createAddressAction, deleteAddressAction, updateAddress } from "../State/Order/Action";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik, Form} from "formik";
import { style } from "./Cart";


const initialValues = {
               id:null,
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country:""
}



export const AddressCard = ({item,showButton,handleSelectAddress}) => {
    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const {auth,cart,order}=useSelector((store) => store)
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt")
    const dispatch = useDispatch(); 
    const { id }= useParams();
    const[formData,setFormData] = useState (initialValues) 


const handleSubmit = () =>{
        const data ={
            ...formData
        }  
        dispatch(updateAddress({addressId:item.id,data,jwt}))  
        console.log("opeanddress",data);
    }   
    
const handleInputChange = async(e) =>{
    const {name,value}=e.target
    await setFormData ({
        ...formData,[name]:value
    })
}

const handledeleteAddress = (addressId) =>{
           dispatch(deleteAddressAction({addressId,jwt}))
}  
    

return(
        <Card className="flex gap-5 w-64 p-5">
            <HomeIcon/>
            <div className="space-y-3 tex-gray-500 ">
            <h1 className="font-semibold text-lg text-white">Home</h1>   
                {showButton && ( <Button variant="outlined" onClick={handleOpenAddressModal}><Edit/></Button>)}
                {showButton && ( <Button variant="outlined" onClick={()=>handledeleteAddress(item.id)}><Delete/></Button> )}
                <p>{item.streetAddress}</p>
                <p>{item.city}</p>
                <p>{item.state} - {item.postalCode} {item.country}</p>
             {showButton && ( <Button variant="outlined" fullWidth onClick={()=>handleSelectAddress(item)}>Delivery Here</Button> )}                 
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
             <Box sx={style}>
                    <Formik initialValues={initialValues}
                        //validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                  <Form>          
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="streetAddress"
                                    label="streetAddress"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    value={formData.streetAddress}
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
                                    onChange={handleInputChange}
                                    value={formData.city}
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
                                    onChange={handleInputChange}
                                    value={formData.state}
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
                                    onChange={handleInputChange}
                                    value={formData.postalCode}
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
                                    name="country"
                                    label="country"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    value={formData.country}
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
                           <Button fullWidth variant="contained" type="submit" color="primary" >Update Address</Button>  
                        </Grid>
                        </Grid>
                    </Form>    
               </Formik>
         </Box>   

            </Modal>
        </Card>
    );
};