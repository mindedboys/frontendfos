import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails, withdrawalRequest } from "../../component/State/Withdrawal/Action";


export const WithdrawalForm =() => {
    const [amount,setAmount] = React.useState("");
    const [loading, setLoading] = useState(false);    
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {wallet,withdraw} = useSelector((store) => store)  


    const handlechange = (e) =>{
        setAmount(e.target.value)
    }
    
    const handleSubmit = () =>{
        dispatch(withdrawalRequest({amount,jwt}))
        console.log(amount);
    
    }
 
useEffect(()=>{
        dispatch(getPaymentDetails(jwt));
    },[]);
        


return(
        <div className="pt-10 space-y-5">
            <div className="flex justify-between items-center
            rounded-md bg-salad-900 text-xl font-bold px-5 py-4">
                 <p>Available Balance</p>   
                    <p>$9000</p>
            </div>
            <div className="flex flex-col items-center">
                    <h4>Enter Withdrawal Amount</h4>
                    <div className="flex items-center justify-between">
                    <input type="number" placeholder="$0000" 
                        onChange={handlechange}
                        value={amount}
                        className="withdrawalInput py-7 border-none outline-none 
                        focus:outline-none px-0 text-2xl text-center"                       
                    />   
                    </div>
            </div>
            <div>
                <p className="pb-2">Transfer to</p>
                <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
                    <img className="h-8 w-8" src="https://clipartix.com/wp-content/uploads/2016/08/Bank-clip-art-free-free-clipart-images.jpg" alt="" />
                    <div>
                    <p className="text-xl-font-bold">{withdraw.PaymentDetails?.bankName}</p>
                    <p className="text-xs-font-bold">{withdraw.PaymentDetails?.accountNumber}</p>
                    </div>
                </div>
            </div>
            <Button className="w-full py-7 text-xl" fullWidth onClick={handleSubmit} color="primary">Withdraw</Button>
        </div>

    )
}

export default WithdrawalForm;