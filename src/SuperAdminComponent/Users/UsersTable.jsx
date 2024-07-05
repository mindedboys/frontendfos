import {Box,Card,CardHeader,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getAllUser } from "../../component/State/Authentication/Action";


const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8de4d3", 
};


export const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector((store) => store);


useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getAllUser(jwt))
    setLoading(false);
   },800)    
},[])



return (
  <Box>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
      <Card className="mt-1">
        <CardHeader title={"All Users"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User_ID</TableCell>
                <TableCell align="right">User_Name</TableCell>
                <TableCell align="right">User_Email</TableCell>
                <TableCell align="right">User_Mobile</TableCell>
                <TableCell align="right">User_Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auth.users.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="right"><p>{item.fullName}</p></TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.mobile}</TableCell>
                  <TableCell align="right">{item.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      }
    </Box>
  );
};

export default UsersTable;
