import { Button, TextField, Typography } from "@material-ui/core";
import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const initialValue={ 
    email:"", 
}


const ForgotForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()


const handleSubmit = async (values) =>{/*
    setLoading(true);
    setTimeout(()=>{
        dispatch(loginUser({userData:values,navigate}))
    setLoading(false);
    },800)     
    */
}
        
return(
    <div>
        <Typography variant='h5' className='text center'>Forgot Password</Typography>   
            <Formik onSubmit={handleSubmit} initialValues={initialValue}>
               <Form >
                    <Field 
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    />
               <Button sx={{mt:2, padding:"1rem"}} fullWidth type='submit' variant='contained'>Forgot Password</Button>        
            </Form>
            </Formik>    
            <Typography variant="body2" align='center' sx={{mt:3}}>
                <Button size='small' onClick={()=>navigate("/account/login")}>Login</Button>
            </Typography>
        </div>
    
)
}

export default ForgotForm;