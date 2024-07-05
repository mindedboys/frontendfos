import axios from "axios";
import { ADD_PAYMENT_DETAILS_FAILURE, ADD_PAYMENT_DETAILS_REQUEST, ADD_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_REQUEST, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, WITHDRAWALPROCEED_FAILURE, WITHDRAWALPROCEED_REQUEST, WITHDRAWALPROCEED_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./ActionType";
import { api } from "../../config/api";


export const withdrawalRequest = ({amount,jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:WITHDRAWAL_REQUEST});
     try{
        const response = await api.post(`/api/withdrawal/${amount}`,null, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
        console.log("Withdrawal Request...",response.data);
     dispatch({type:WITHDRAWAL_SUCCESS,payload:response.data});
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:WITHDRAWAL_FAILURE,payload:error});
     }
   };
};

export const proceedWithdrawal = ({jwt,withdrawalId,accept}) =>{
    return async (dispatch) =>{
        dispatch({type:WITHDRAWAL_PROCEED_REQUEST});
     try{
        const response = await api.patch(`/api/admin/withdrawal/${withdrawalId}/proceed/${accept}`,null, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:WITHDRAWAL_PROCEED_SUCCESS,payload:response.data});
     console.log("Proceed Withdrawal...",response.data);
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:WITHDRAWAL_PROCEED_FAILURE,payload:error});
     }
   };
};

export const getWithdrawalHistory = (jwt) =>{
    return async (dispatch) =>{
        dispatch({type:GET_WITHDRAWAL_HISTORY_REQUEST});
     try{
        const response = await api.get(`/api/withdrawal/history`,{
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:GET_WITHDRAWAL_HISTORY_SUCCESS,payload:response.data});
     console.log("Get Withdrawal Hisotry...",response.data);
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:GET_WITHDRAWAL_HISTORY_FAILURE,payload:error});
     }
   };
};

export const getAllWithdrawalRequest = (jwt) =>{
    return async (dispatch) =>{
        dispatch({type:GET_WITHDRAWAL_REQUEST_REQUEST});
     try{
        const response = await api.get(`/api/admin/withdrawal/request`,{
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:GET_WITHDRAWAL_REQUEST_SUCCESS,payload:response.data});
     console.log("Get all Withdrawal Request...",response.data);
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:GET_WITHDRAWAL_REQUEST_FAILURE,payload:error});
     }
   };
};

export const addPaymentDetails = ({paymentDetails,jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:ADD_PAYMENT_DETAILS_REQUEST});
     try{
        const response = await api.post(`/api/payment-details`,paymentDetails, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
        console.log("Add Payment-Details...",response.data);
     dispatch({type:ADD_PAYMENT_DETAILS_SUCCESS,payload:response.data});
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:ADD_PAYMENT_DETAILS_FAILURE,payload:error});
     }
   };
};

export const getPaymentDetails = (jwt) =>{
    return async (dispatch) =>{
        dispatch({type:GET_PAYMENT_DETAILS_REQUEST});
     try{
        const response = await api.get(`/api/payment-details`, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
        console.log("get Payment-Details...",response.data);
     dispatch({type:GET_PAYMENT_DETAILS_SUCCESS,payload:response.data});
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:GET_PAYMENT_DETAILS_FAILURE,payload:error});
     }
   };
};
