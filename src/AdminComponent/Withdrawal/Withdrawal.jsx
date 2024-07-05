import React, { useEffect, useState } from "react";
import {Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getPaymentDetails, getWithdrawalHistory } from "../../component/State/Withdrawal/Action";
import PaymentDetailsForm from "../Withdrawal/PaymentDetailsForm";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import {CardContent } from "@material-ui/core";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



export const Withdrawal = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);    
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {wallet,withdraw} = useSelector((store) => store) 


useEffect(()=>{
    dispatch(getWithdrawalHistory(jwt));
    dispatch(getPaymentDetails(jwt));
},[]);
    

const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
        setOpen(false);
  };

return (
        <Box>
            <div className="px-5 pt-5">
			<Card >
			<div className="px-5">
            <h1 className="text-3xl font-bold px-2 py-5"> Payment Details</h1>
       {withdraw.PaymentDetails ? <Card>
            <CardContent>
                <div className="flex items-center">
                    <p className="w-32">Account Number</p>
                    <p className="text-gray-400"> : {withdraw.PaymentDetails.accountNumber}</p>
                </div>
                <div className="flex items-center">
                    <p className="w-32">Account Holder Name</p>
                    <p className="text-gray-400"> : {withdraw.PaymentDetails.accountHolderName}</p>
                </div>
                <div className="flex items-center">
                    <p className="w-32">IFSC Code</p>
                    <p className="text-gray-400"> : {withdraw.PaymentDetails.ifsc}</p>
                </div>
                <div className="flex items-center">
                    <p className="w-32">Bank Name</p>
                    <p className="text-gray-400"> : {withdraw.PaymentDetails.bankName}</p>
                </div>
            </CardContent>
        </Card>:
        <div className="pt-10 w-full lg:w-[60%]">
        <Button variant="outlined" onClick={handleClickOpen} >Add Payment Details</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <div className="h-250 w-250 hover:text-gray-400 cursor-pointer 
			            	flex flex-col items-cetner justify-center rounded-md ">
        <DialogContent>
          <PaymentDetailsForm />
        </DialogContent>
       </div> 
      </Dialog>
    </div>}
    </div>
			</Card>
			</div>
            <Card className='mt-1'>
                <CardHeader  title={"Withdrawal History"} sx={{ px: 10,pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="right">ID</TableCell>
                                <TableCell align="right">Date & Time</TableCell>
                                <TableCell align="right">Payment Method</TableCell>
                                <TableCell align="right">Withdraw Amount</TableCell>
                                <TableCell align="right">Payment Status</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {withdraw.history.map((item,index) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{item.id}</TableCell>
                                    <TableCell align="right">{item.date}</TableCell>
                                    <TableCell align="right">Bank</TableCell>
                                    <TableCell align="right">{item.amount}</TableCell>
                                    <TableCell align="right">{item.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>  
        </Box>
    )
}

export default Withdrawal;