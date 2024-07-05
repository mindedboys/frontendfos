import { Email, Password } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const initialValue={ 
    email:"", 
    password:"" 
}



const LoginForm = () =>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch()


const handleSubmit = async (values) =>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(loginUser({userData:values,navigate}))
    setLoading(false);
    },800)     
}
        
return(
    <>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
    <div>
        <Typography variant='h5' className='text center'>Login</Typography>   
            <Formik onSubmit={handleSubmit} initialValues={initialValue}>
               <Form >
                    <Field 
                    as={TextField}
                    name="email"
                    label="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    />
                    <Field 
                    as={TextField}
                    name="password"
                    label="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                />           
               <Button sx={{mt:2, padding:"1rem"}} fullWidth type='submit' variant='contained'>Login</Button>        
            </Form>
            </Formik>    
            <Typography variant="body2" align='center' sx={{mt:3}}>Don't have an Account?
                <Button size='small' onClick={()=>navigate("/account/register")}>Register</Button>
            </Typography>
            <div className="mt-3 px-15 text-sm">
                <Button variant="outlined" size='small' onClick={()=>navigate("/account/forgot")}>Forgot Password</Button>
            </div>
        </div>
    }
    </>
    );
} ;

export default LoginForm