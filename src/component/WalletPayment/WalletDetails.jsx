import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Card,CardContent } from "@material-ui/core";
import WalletIcon from '@mui/icons-material/Wallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import UploadIcon from '@mui/icons-material/Upload';
import TopUpForm from "./TopUpForm";
import TransferForm from "./TransferForm";
import HistoryIcon from '@mui/icons-material/History';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Avatar } from "material-ui";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { depositMoney, getAllTransactions, getUserWallet, getWalletTransactions} from "../../component/State/Wallet/Action";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };


function useQuery(){
	return new URLSearchParams(useLocation().search);
}  



export const WalletDetails =() => {
	const [openMoney, setOpenMoney] = React.useState(false);
	const [openWithdrawal, setOpenWithdrawal] = React.useState(false);
	const [openTransfer, setOpenTransfer] = React.useState(false);
	const [open, setOpen] = React.useState(false);

const [loading, setLoading] = useState(false);    
const dispatch = useDispatch();
const jwt = localStorage.getItem("jwt");
const {wallet,withdraw,auth} = useSelector((store) => store)  
const navigate = useNavigate();
const query = useQuery();
const orderId = query.get("order_id");
const paymentId = query.get("payment_id");	
const razorpayPaymentId = query.get("razorpay_payment_id");
const{id} = useParams();
const[currentTransaction,setCurrentTransaction]=useState([])



useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
    handleFetchUserWallet();
	handleFetchUserWalletTransaction();
    setLoading(false);
},800)  
},[]);
	

const handleClickOpen = () => {
      setOpen(true);
	};
	const handleClose = () => {
    	  setOpen(false);
	};
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
	const handleClickToMoneyOpen = () => {
		setOpenMoney(true);
	};
	const handleClickToMoneyClose = () => {
		setOpenMoney(false);
	};


useEffect(()=>{
    if(orderId){
     dispatch(depositMoney({
      jwt,
      orderId,
      paymentId:razorpayPaymentId || paymentId,
      navigate
      }))
   }
 },[orderId,paymentId,razorpayPaymentId]);

 

const handleFetchUserWallet = () =>{
	//const CurentWalletId =wallet.userWallet.id;
    setLoading(true);
    setTimeout(()=>{
    dispatch(getUserWallet({jwt}))
	//dispatch(getWalletTransactions({CurentWalletId:wallet.userWallet.id,jwt}))
    setLoading(false);
},800)    
}

const handleFetchUserWalletTransaction = () =>{
	const CurentWalletId =wallet.userWallet.id;
	console.log("##########",CurentWalletId);
	dispatch(			
		getWalletTransactions({jwt,CurentWalletId}),
	//getAllTransactions(jwt)
	//handleFetchTransaction()
);
};
console.log("wwwwwwwwwww",wallet); 

const handleFetchTransaction = () => {
	const CurentWalletId =wallet.userWallet.id;
	let WalletId = wallet.Transactions.filter(item=>item.wallet.id===CurentWalletId)
	setCurrentTransaction(dispatch(getWalletTransactions({WalletId,jwt})));
   console.log("##########",WalletId); //7

} 

return (
		<>
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
							<p className="text-sm">{wallet.userWallet.id}</p>
							<ContentCopyIcon className="cursor-pointer hover:text-gray-400" />
							</div>
							</div>
                    </div>
                    <div>
						<ReplayIcon onClick={handleFetchUserWallet} className="w-6, h-6 cursor-pointer hover:text-gray-400"/>
					</div>
                </div>
				<CardContent>
					<div className="flex items-center">
						<span className="text-2xl font-semibold py-3">Balance-: {wallet.userWallet.balance}</span>	
					</div>
					<Button variant="outlined" color="primary"onClick={handleClickToMoneyOpen}>
					              Add Money<UploadIcon /></Button>
			        <Dialog  open={openMoney} onClose={handleClickToMoneyClose}>
				       <div className="h-250 w-250 hover:text-gray-400 cursor-pointer 
			            	flex flex-col items-cetner justify-center rounded-md ">       
									<DialogContent>
				     						<DialogTitle>TopUp Your Wallet</DialogTitle>
					    							 <TopUpForm/>
									</DialogContent>
						</div>
					</Dialog>
				<Button variant="outlined" color="primary"onClick={handleClickToTransferOpen}>Transfer</Button>
			        <Dialog  open={openTransfer} onClose={handleClickToTransferClose}>
				       <div className="h-250 w-250 hover:text-gray-400 cursor-pointer 
			            	flex flex-col items-cetner justify-center rounded-md">       
							<DialogContent>
				     			<DialogTitle>Transfer</DialogTitle>
					     				<TransferForm/>
								</DialogContent>
						</div>
					</Dialog>
			</CardContent>
            </div>
            </Card>
			</div>
			</div>
			<div className="flex py-5 px-10">
				<div className="flex gap-2 items-center">
					<h1 className="text-2xl font-semibold">History</h1>
					<HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400" />
				</div>
			</div>
			<div className="space-y-2 px-10">
			{wallet.Transactions?.map((item,i)=><div key={i}>
			
					<Card className="px-5 flex justify-between items-center">
						<div className="flex items-center gap-5">
							<Avatar>
								<ShuffleIcon onClick={handleFetchUserWallet} />
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