import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ForgotUser } from "../State/Authentication/Action";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const initialValue={ 
    sendTo:"",
    verificationType:"" 
}


const ForgotForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const jwt = localStorage.getItem("jwt")
    const[oTPMethod,setOTPMethod] = React.useState("EMAIL");


const handleOTPMethodChange =(e)=>{
    setOTPMethod(e.target.value);
}

const handleSubmit = async (value) =>{
    const data = {sendTo:value.sendTo, verificationType:value.verificationType}
    setLoading(true);
    setTimeout(()=>{
        dispatch(ForgotUser(data))
    setLoading(false);
    },800)     
    
}
        
return(
    <div >
        <Typography variant='h6' >Enter Registered Email</Typography>   
            <Formik onSubmit={handleSubmit} initialValues={initialValue}>
               <Form >
               <Field 
                    as={TextField}
                    name="email"
                    label="Email address"
                    fullWidth
                    variant="outlined"
                    margin="normal" className="bg-white"
                    />
                            <div>
            <Typography>OTP Type</Typography>
            <FormControl className="py-10 space-y-5" component={"fieldset"}>
            <RadioGroup 
                 onChange={handleOTPMethodChange}
                 aria-labelledby="demo-radio-buttons-group-label"
                 value={oTPMethod}
                 name="OTP_Method"
            >
        <FormControlLabel label="Email" value="EMAIL" control={<Radio />} name="EMAIL"/>
        <FormControlLabel label="Mobile" value="MOBILE" control={<Radio />} name="MOBILE" />
        </RadioGroup>
        </FormControl>
       </div>
               <Button color="secondary" type='submit' variant='contained'>Send OTP</Button>        
            </Form>
            </Formik>    
        </div>
)}
export default ForgotForm;