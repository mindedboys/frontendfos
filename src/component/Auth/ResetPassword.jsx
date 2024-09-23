import { Button, TextField, Typography } from "@material-ui/core";
import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ResetUser } from "../State/Authentication/Action";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const initialValue={ 
    id:"",
    password:"",
    otp:"" 
}


const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const { id }= useParams();

const handleSubmit = async (values) =>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(ResetUser({userData:values,navigate}))
    setLoading(false);
    },800)     
    
}
        
return(
    <div>
        <Typography className="flex justify-center py-10" variant='h5' >Reset Password Details</Typography>  
        <div className="flex flex-center justify-center"> 
            <Formik  onSubmit={handleSubmit} initialValues={initialValue}>
               <Form >
                <p className="text-sm">Enter OTP:
               <Field 
                    as={TextField}
                    name="otp"
                    label="Enter OTP"
                    fullWidth
                    variant="outlined"
                    margin="normal" className="bg-white"
                    /></p>
                <p className="text-sm">Enter Password:    
                <Field  
                    as={TextField}
                    name="password"
                    label="Enter New Password"
                    fullWidth
                    variant="outlined"
                    margin="normal" className="bg-white"
                    />
                </p>    
                <div className="flex justify-center py-10">        
               <Button color="secondary" type='submit' variant='contained'>Update Password</Button>
               </div>        
            </Form>
            </Formik>    
            </div>
        </div>
)}
export default ResetPassword;