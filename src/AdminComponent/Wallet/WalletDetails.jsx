import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Card,CardContent } from "@material-ui/core";
import WalletIcon from '@mui/icons-material/Wallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import HistoryIcon from '@mui/icons-material/History';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Avatar } from "material-ui";
import { Grid } from "material-ui";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Withdrawal from "../Withdrawal/Withdrawal";
import ClipLoader from "react-spinners/ClipLoader";
import { getAllTransactions, getTransactionsByWalletId, getUserWallet} from "../../component/State/Wallet/Action";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };




export const WalletDetails =() => {
	const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
	const [openTransfer, setOpenTransfer] = React.useState(false);

const [loading, setLoading] = useState(false);    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {wallet,withdraw} = useSelector((store) => store)  
const navigate = useNavigate();


const handleClickToTransferOpen = () => {
	setOpenTransfer(true);
};
const handleClickToTransferClose = () => {
	setOpenTransfer(false);
};
const handleClickToWithdrawalOpen = () => {
	setOpenWithdrawal(true);
};
const handleClickToWithdrawalClose = () => {
	setOpenWithdrawal(false);
};



useEffect(()=>{
	setLoading(true);
	setTimeout(()=>{
	handleFetchUserWallet();
	setLoading(false);
},800)  
},[dispatch,jwt]);


const handleFetchUserWallet = (walletId) =>{
//walletId = wallet.Transactions[0].wallet.id;
setLoading(true);
setTimeout(()=>{
dispatch(getUserWallet(jwt));
//dispatch(getWalletTransactions({walletId,jwt}))
dispatch(getAllTransactions(jwt));
setLoading(false);
},800)    
}


console.log("-----",wallet.restaurantWallet.amount);




return (
		<>
		 <Grid container spacing={2}>
		 <Grid item xs={12} lg={7} >
		 <div  className="flex flex-col ">
		 <div className="px-10 pt-5">
         <Card>
            <div className="pb-9">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                            <WalletIcon />
							<div>
                            <h1 className="text-2xl">My Wallet</h1>
							<div className="flex items-center gap-3">
							<p className="text-sm">{wallet.restaurantWallet.id}</p>
							<ContentCopyIcon className="cursor-pointer hover:text-gray-400 hover:scale-90 duration-300" />
							</div>
							</div>
                    </div>
                    <div>
						<ReplayIcon onClick={handleFetchUserWallet} 
						className="w-6, h-6 cursor-pointer hover:text-gray-400 hover:scale-90 duration-300"/>
					</div>
                </div>
				<CardContent>
					<div className="flex items-center">
						<span className="text-2xl font-semibold py-3"> ₹{wallet.restaurantWallet.balance}</span>	
					</div>
				<Button className="hover:scale-90 duration-300" variant="outlined" color="primary"onClick={handleClickToWithdrawalOpen}>Withdrawal</Button>
			        <Dialog  open={openWithdrawal} onClose={handleClickToWithdrawalClose}>
				       <div className="h-250 w-250 hover:text-gray-400 cursor-pointer 
			            	flex flex-col items-cetner justify-center rounded-md ">       
								<DialogContent>
				     					<DialogTitle>Withdrawal Form</DialogTitle>
					    						 <WithdrawalForm/>
								</DialogContent>
						</div>
					</Dialog>
				<Button className="hover:scale-90 duration-300" variant="outlined" color="primary"onClick={handleClickToTransferOpen}>Transfer</Button>
			        <Dialog  open={openTransfer} onClose={handleClickToTransferClose}>
				       <div className="h-250 w-250 hover:text-gray-400 cursor-pointer 
			            	flex flex-col items-cetner justify-center rounded-md">       
							<DialogContent>
				     			<DialogTitle>Transfer Form</DialogTitle>
					     				<TransferForm/>
								</DialogContent>
						</div>
					</Dialog>
			</CardContent>
            </div>
            </Card>
			</div>
			</div>
			</Grid>
			</Grid>
			<div className="flex py-5 px-10">
				<div className="flex gap-2 items-center">
					<h1 className="text-2xl font-semibold">History</h1>
					<HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400 hover:scale-90 duration-300" />
				</div>
			</div>
			<div className="space-y-2 px-10">
			{wallet.Transactions?.map((item,i)=><div key={i}>
			
					<Card className="px-5 flex justify-between items-center hover:scale-95 duration-300">
						<div className="flex items-center gap-5">
							<Avatar>
								<ShuffleIcon className="hover:scale-90 duration-300" onClick={handleFetchUserWallet} />
							</Avatar>
							<div className="space-y-1">
								<h4>{item.purpose} || { item.type} || Transfered_Id-: { item.transferId}</h4>
								<p className="text-sm text-gray-500">{item.date}</p>
							</div>
						</div>
						<div>
							<p className="text-green-500">₹{item.amount} INR</p>
						</div>
					</Card>
			</div>
			)}
		</div>
	</>
	);
}

export default WalletDetails;