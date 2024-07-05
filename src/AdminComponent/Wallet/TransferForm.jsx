import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferMoney } from "../../component/State/Wallet/Action";


export const TransferForm =() => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {wallet} = useSelector((store) => store)

const [formData,setFormData]=React.useState({
    amount:'',
    walletId:'',
    purpose:'',    
})
const handlechange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
}

const handleSubmit = () =>{
    dispatch(transferMoney({
        jwt:localStorage.getItem('jwt'),
        walletId:formData.walletId,
        reqData:{
            amount:formData.amount,
            purpose:formData.purpose,
        }
    }))
    console.log(formData);

}




return(
        <div className=" pt-10 space-y-5">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <input type="text" 
                name="amount" 
                onChange={handlechange}
                value={formData.amount}
                className="py-7"
                placeholder="$0000"
                />
            </div>
            <div>
                <h1 className="pb-1">Wallet Id</h1>
                <input type="text" 
                name="walletId" 
                onChange={handlechange}
                value={formData.walletId}
                className="py-7"
                placeholder="#ADSE056"
                />
            </div>
            <div>
                <h1 className="pb-1">Purpose</h1>
                <input type="text" 
                name="purpose" 
                onChange={handlechange}
                value={formData.purpose}
                className="py-7"
                placeholder="Purpose"
                />
            </div>
            <Button fullWidth onClick={handleSubmit} color="primary">Submit</Button>

        </div>

    )
}

export default TransferForm;