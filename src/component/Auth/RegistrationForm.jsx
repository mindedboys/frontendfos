import { Button,MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const initialValue = {
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}



const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch() 


const handleSubmit = async (values) => {
    setLoading(true);
    setTimeout(()=>{ 
        dispatch(registerUser({userData:values,navigate}))
    setLoading(false);
    },800)    
}


return (
    <>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <div>
            <Typography variant='h5' className='text center'>Register</Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValue}>
                <Form >
                    <Field
                        as={TextField}
                        name="fullName"
                        label="full name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Field
                        as={TextField}
                        name="mobile"
                        label="mobile"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    /> 
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
                        <Field
                        fullWidth 
                        margin="normal"
                        as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            name="role"
                            //value={age}
                            //onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Field>
                    <Button className="h-10 w-8" sx={{ mt: 3, padding: "1rem" }} fullWidth type='submit' variant='contained'>Register</Button>
                </Form>
            </Formik>
            <Typography variant="body2" align='center' sx={{ mt: 3 }}>If have an Account Already?
                <Button size='small' onClick={() => navigate("/account/login")}>Login</Button>
            </Typography>
        </div>
        }  
    </>
     );
};

export default RegistrationForm