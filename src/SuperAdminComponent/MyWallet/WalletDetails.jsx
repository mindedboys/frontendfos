import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import WalletIcon from '@mui/icons-material/Wallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import HistoryIcon from '@mui/icons-material/History';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Avatar } from "material-ui";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getAllTransactions, getUserWallet } from "../../component/State/Wallet/Action";



const CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "#8de4d3",
};



export const WalletDetails = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const jwt = localStorage.getItem("jwt");
	const { wallet, withdraw, auth } = useSelector((store) => store)


useEffect(() => {
	setLoading(true);
	setTimeout(() => {
			handleFetchUserWallet();
			setLoading(false);
	}, 800)
}, [dispatch, jwt]);


const handleFetchUserWallet = () => {
			setLoading(true);
		setTimeout(() => {
			dispatch(getUserWallet(jwt));
			dispatch(getAllTransactions(jwt));
			setLoading(false);
	}, 800)
}


return (
		<>
			<div className="flex flex-col">
				<div className="px-10 pt-5">
					<Card>
						<div className="pb-9">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-5">
									<WalletIcon />
									<div>
										<h1 className="text-2xl">My Wallet</h1>
										<div className="flex items-center gap-3">
											<p className="text-sm">{wallet.adminWallet.id}</p>
											<ContentCopyIcon className="cursor-pointer hover:text-gray-400 hover:scale-90 duration-300" />
										</div>
									</div>
								</div>
								<div>
									<ReplayIcon onClick={handleFetchUserWallet} className="w-6, h-6 cursor-pointer hover:text-gray-400 hover:scale-90 duration-300" />
								</div>
							</div>
							<CardContent>
								<div className="flex items-center">
									<span className="text-2xl font-semibold py-3">Balance-: {wallet.adminWallet.balance}</span>
								</div>
							</CardContent>
						</div>
					</Card>
				</div>
			</div>
			<div className="flex py-5 px-10">
				<div className="flex gap-2 items-center">
					<h1 className="text-2xl font-semibold">History</h1>
					<HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400 hover:scale-90 duration-300" />
				</div>
			</div>
			<div className="space-y-2 px-10">
				{wallet.Transactions?.map((item, i) => <div key={i}>

					<Card className="px-5 flex justify-between items-center hover:scale-95 duration-300">
						<div className="flex items-center gap-5">
							<Avatar>
								<ShuffleIcon onClick={handleFetchUserWallet} />
							</Avatar>
							<div className="space-y-1">
								<h4>{item.purpose} || {item.type} || Transfered_Id-: {item.transferId}</h4>
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