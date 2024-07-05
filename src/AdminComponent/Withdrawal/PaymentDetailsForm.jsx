import { useFormik } from "formik";
import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPaymentDetails } from "../../component/State/Withdrawal/Action";




const initialValues={
    accountNumber:"",
    conformAccountNumber:"",
    accountHolderName:"",
    ifsc:"",
    bankName:"",
}


export const PaymentDetailsForm =() => {
    const [loading, setLoading] = useState(false);  
    const [open, setOpen] = React.useState(false);
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {wallet,withdraw} = useSelector((store) => store)
    


const handleClickOpen = () => {
        setOpen(true);
};
    
const handleClose = () => {
        setOpen(false);
};


const formik = useFormik({
    initialValues,onSubmit:(values)=>{
       // e.preventDefault();
            const data ={ 
                accountNumber:values.accountNumber, 
                conformAccountNumber:values.conformAccountNumber,
                accountHolderName:values.accountHolderName,
                ifsc:values.ifsc,
                bankName:values.bankName,
            }
    setLoading(true);
    setTimeout(()=>{    
       dispatch(addPaymentDetails({jwt,paymentDetails:data}))
    setLoading(false);
    },800)   
}})


return(
     <div className="px-10 py-2 bg-black">
                <Box>
                    <h1 className='font-bold text-2xl text-center py-2'>Add Payment Details</h1>
                    <form onSubmit={formik.handleSubmit} className='space-y-4'>
                     <Grid container spacing={2}>       
                        <Grid item xs={12}>
                            <TextField fullWidth
                                name="accountNumber"
                                label="Account-Number"
                                variant="outlined"
                                value={formik.values.accountNumber}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="conformAccountNumber"
                                label="Conform-Account Number"
                                variant="outlined"
                                value={formik.values.conformAccountNumber}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="accountHolderName"
                                label="Account-Holder Name"
                                variant="outlined"
                                value={formik.values.accountHolderName}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField fullWidth
                                name="ifsc"
                                label="IFSC"
                                variant="outlined"
                                value={formik.values.ifsc}
                                onChange={formik.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                               <TextField fullWidth
                                name="bankName"
                                label="Bank Name"
                                variant="outlined"
                                value={formik.values.bankName}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        </Grid>
                        
                        <Box mt={2}>
                             <Button fullWidth  variant="contained" color="primary" type="submit">Submit</Button>       
                        </Box>
                      </form>
                </Box>
        </div>    
       
)

}
export default PaymentDetailsForm;