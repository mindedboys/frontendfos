import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography } from "@material-ui/core";
import { Label } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { depositMoney, paymentHandler } from "../../component/State/Wallet/Action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";






export const TopUpForm =() => {
const [amount,setAmount] = React.useState("");
const[paymentMethod,setPaymentMethod] = React.useState("RAZORPAY");
const [loading, setLoading] = useState(false);    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {wallet} = useSelector((store) => store)  
const navigate = useNavigate();


const handlePaymentMethodChange =(e)=>{
    setPaymentMethod(e.target.value);
}

const handlechange = (e) =>{
    setAmount(e.target.value)
}

const handleSubmit = () =>{
    console.log(amount,paymentMethod);
    dispatch(paymentHandler({jwt,paymentMethod,amount}))

}



return(
        <div  className=" pt-10 space-y-5">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input 
                onChange={handlechange}
                value={amount}
                className="flex items-center text-lg"
                placeholder="0000"
                />
            </div>
            <div>
            <Typography>Payment Method Type</Typography>
            <FormControl className="py-10 space-y-5" component={"fieldset"}>
            <RadioGroup
                 onChange={handlePaymentMethodChange}
                 aria-labelledby="demo-radio-buttons-group-label"
                 value={paymentMethod}
                 name="Payment_Method"
            >
        <FormControlLabel value="RAZORPAY" control={<Radio />} name="RAZORPAY" 
        label={<img className="h-20 bg-white rounded-md" 
        src="https://posible.in/wp-content/uploads/2020/07/razorpay_logo_black.png" alt="" />}/>

        <FormControlLabel value="STRIPE" control={<Radio />} name="STRIPE" 
        label={<img className="h-20 bg-white rounded-md w-15 " 
        src="https://miro.medium.com/v2/resize:fit:520/1*NZsPZSVILFOBX6ZHzUdaCA.jpeg" alt="" />} />
        </RadioGroup>
        </FormControl>
       </div>
            <Button fullWidth onClick={handleSubmit} variant="outlined" color="secondary">Submit</Button>
        </div>
    )
}

export default TopUpForm;