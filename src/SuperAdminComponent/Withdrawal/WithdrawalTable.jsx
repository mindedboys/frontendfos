import {Box,Button, Card, CardHeader,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawalRequest, proceedWithdrawal } from "../../component/State/Withdrawal/Action";
import {useParams } from "react-router-dom";





const status = [
  { label: "PENDING", value:"Pending"},
  { label: "SUCCESS", value:"Sucess"},
  { label: "DECLINE", value:"Decline"}
  
];


export const WithdrawalTable = () => {
  const [selectedwithdrawalId, setSelectedwithdrawalId] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {withdraw} = useSelector((store) => store);
  const {id} = useParams();

  useEffect(() => {
         dispatch(getAllWithdrawalRequest(jwt));
}, []);


const handleUpdateStatus = (accept) => {
     dispatch(proceedWithdrawal({jwt,withdrawalId:withdraw.requests[0]?.id,accept}));
    } 

  const handleRowClick = (rowData) => {
    setSelectedwithdrawalId(rowData.id);
  };
  const handleChange = e => {
    setStatus(e.target.value);
    console.log(e.target.value)
  }
  

return (
  <Box>
   <Card className='mt-1'>
                <CardHeader  title={"All Withdrawal Request"} sx={{ px: 10,pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="right">Req_ID</TableCell>
                                <TableCell align="right">Req_Date-Time</TableCell>
                                <TableCell align="right">Withdraw Amount</TableCell>
                                <TableCell align="right">Payment Status</TableCell> 
                                <TableCell align="right">Update</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {withdraw.requests.map((item,index) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{item.id}</TableCell>
                                    <TableCell align="right">{item.date}</TableCell>
                                    <TableCell align="right">{item.amount}</TableCell>
                                    <TableCell align="right">{item.status}</TableCell>
                                    <TableCell align="right">
                                    <Button onClick={()=>handleUpdateStatus(item.id)}>{item.accept?<span className="px-5 py-2 rounded-full bg-green-400
                                             text-gray-950">accept</span>:<span className="px-5 py-2 rounded-full bg-red-400
                                             text-gray-950">Reject</span>}</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
    </Box>
  );
};

export default WithdrawalTable;
