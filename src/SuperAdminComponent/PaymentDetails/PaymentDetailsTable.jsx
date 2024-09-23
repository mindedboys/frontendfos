import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentDetails, updatePaymentDetails } from "../../component/State/Withdrawal/Action";
import { useParams } from "react-router-dom";
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Grid, Modal, TextField } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";


export const DetailsStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: "white",
  outline: "none",
  boxShadow: 24,
  p: 2,
};


export const PaymentDetailsTable = () => {
  const [selectedUserId, setSelectedUserId] = useState(null); // Initialize with null
  const [open, setOpen] = useState(false); // State for modal open/close
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { withdraw } = useSelector((store) => store);
  const { id } = useParams();

useEffect(() => {
    dispatch(getAllPaymentDetails(jwt));
}, [dispatch, jwt]);

const handleOpenAddressModal = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleSubmit = (values) => {
  const data = {
    accountNumber: values.accountNumber,
    conformAccountNumber: values.conformAccountNumber,
    accountHolderName: values.accountHolderName,
    ifsc: values.ifsc,
    bankName: values.bankName,
  };
  dispatch(updatePaymentDetails({ jwt, userId: selectedUserId, data }));
  handleClose(); // Close modal after submission
};

const handleRowClick = (userId) => {
  setSelectedUserId(userId); // Update selectedUserId on row click
};


return (
  <Box>
    <Card className='mt-1'>
      <CardHeader title={"User's Account Details"} sx={{ px: 3, pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Account_ID</TableCell>
                <TableCell align="right">Account_Name</TableCell>
                <TableCell align="right">Account_Number</TableCell>
                <TableCell align="right">Conform_Account_Number</TableCell>
                <TableCell align="right">IFSC_Code</TableCell>
                <TableCell align="right">Bank_Name</TableCell>
                <TableCell align="right">User_ID</TableCell>
                <TableCell align="right">User_FullName</TableCell>
                <TableCell align="right">User_Mobile</TableCell>
                <TableCell align="right">User_Email</TableCell>
                <TableCell align="right">Update_Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdraw.AdminPaymentDetails?.map((item) => (
                 <TableRow className="hover:scale-95 duration-300"
                 key={item.id}
                 selected={item.user.id === selectedUserId}
                 onClick={() => handleRowClick(item.user.id)}  // Pass userId directly to handleRowClick
                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell align="right">{item.accountHolderName}</TableCell>
                  <TableCell align="right">{item.accountNumber}</TableCell>
                  <TableCell align="right">{item.conformAccountNumber}</TableCell>
                  <TableCell align="right">{item.ifsc}</TableCell>
                  <TableCell align="right">{item.bankName}</TableCell>
                  <TableCell align="right">{item.user.id}</TableCell>
                  <TableCell align="right">{item.user.fullName}</TableCell>
                  <TableCell align="right">{item.user.mobile}</TableCell>
                  <TableCell align="right">{item.user.email}</TableCell>
                  <TableCell align="right"> 
                  <Button variant="outlined" color="secondary" 
                         onClick={(e) => handleRowClick(item.user.id)}>
                         <Edit onClick={handleOpenAddressModal} />
                  </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
            {/* Modal for editing payment details */}
              <Modal open={open} onClose={handleClose} 
                  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
             <Box sx={DetailsStyle}>
             <Formik
            initialValues={{
              accountNumber: "",
              conformAccountNumber: "",
              accountHolderName: "",
              ifsc: "",
              bankName: "",
            }}
            onSubmit={handleSubmit}
          >
                 <Form>         
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name="accountNumber"
                                    label="Account Number"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6} >
                                <Field
                                    as={TextField}
                                    name="conformAccountNumber"
                                    label="Conform Account-Number"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name="accountHolderName"
                                    label="Account-Holder Name"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>    
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name="ifsc"
                                    label="IFSC Code"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name="bankName"
                                    label="Bank Name"
                                    fullWidth
                                    variant="outlined"
                                //error={!ErrorMessage("streetAddress")}
                                // helperText={
                                //     <ErrorMessage>
                                //         {(msg)=><span className="text-red-600">{msg}</span>}
                                //     </ErrorMessage>
                                // }
                                >
                                </Field>
                            </Grid>
                            <Grid item xs={12} >
                           <Button variant="outlined" type="submit" color="secondary">Update Details</Button>  
                        </Grid>
                        </Grid>
                    </Form> 
                </Formik>   
            </Box>   
        </Modal>  
    </Box>
  );
};

export default PaymentDetailsTable;
