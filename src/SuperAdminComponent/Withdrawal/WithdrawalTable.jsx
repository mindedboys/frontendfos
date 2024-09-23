import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawalRequest, proceedWithdrawal } from "../../component/State/Withdrawal/Action";
import { Menu, MenuItem } from "material-ui";





const withdrawStatus = [
  { label: "Sucess", value: true },
  { label: "Decline", value: false}
];


export const WithdrawalTable = () => {
  const [selectedwithdrawalId, setSelectedwithdrawalId] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { withdraw } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  useEffect(() => {
    dispatch(getAllWithdrawalRequest(jwt));
  }, []);


  const handleUpdateStatus = (withdrawStatus) => {
    dispatch(proceedWithdrawal({ jwt, withdrawalId: selectedwithdrawalId, withdrawStatus }));
    handleClose();
  }


  const handleClick = (event, withdrawalId) => {
    setAnchorEl(event.currentTarget);
    setSelectedwithdrawalId(withdrawalId);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleRowClick = (rowData) => {
    setSelectedwithdrawalId(rowData.id);
  };


  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title={"All Withdrawal Request"} sx={{ px: 3, pt: 1, alignItems: "center" }} />
        <TableContainer component={Paper} className="px-2">
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Withdraw_ID</TableCell>
                <TableCell align="right">Withdraw_Date</TableCell>
                <TableCell align="right">Withdraw_Amount</TableCell>
                <TableCell align="right">User_Full_Name</TableCell>
                <TableCell align="right">User_ID</TableCell>
                <TableCell align="right">User_Email</TableCell>
                <TableCell align="right">User_Mobile</TableCell>
                <TableCell align="right">Payment_Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdraw.requests.map((item) => (
                <TableRow className="hover:scale-95 duration-300"
                  key={item.id}
                  selected={item.id === selectedwithdrawalId}
                  onClick={() => handleRowClick(item)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="right">{item.date}</TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
                  <TableCell align="right">{item.user.fullName}</TableCell>
                  <TableCell align="right">{item.user.id}</TableCell>
                  <TableCell align="right">{item.user.email}</TableCell>
                  <TableCell align="right">{item.user.mobile}</TableCell>
                  <TableCell align="right">{item.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {withdrawStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateStatus(status.value)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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
