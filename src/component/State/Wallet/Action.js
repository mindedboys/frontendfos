//Action Creators
import axios from "axios";
import { DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_ALL_TRANSACTION_FAILURE, GET_WALLET_ALL_TRANSACTION_REQUEST, GET_WALLET_ALL_TRANSACTION_SUCCESS, GET_WALLET_TRANSACTION_FAILURE, GET_WALLET_TRANSACTION_REQUEST, GET_WALLET_TRANSACTION_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./ActionType";
import { api } from "../../config/api";


export const getUserWallet =({jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:GET_USER_WALLET_REQUEST});
     try{
        const res = await api.get(`/api/wallet`, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:GET_USER_WALLET_SUCCESS,payload:res.data});
     console.log("Get User Wallet",res.data);   
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:GET_USER_WALLET_FAILURE,payload:error});
     }
   };
  };

  /*
export const getWalletTransactions = ({walletId, jwt}) =>{
   return async (dispatch) =>{
       dispatch({type:GET_WALLET_TRANSACTION_REQUEST});
       console.log("-------",walletId);
    try{
       const res = await api.get(`/api/wallet/transactions/get/${walletId}`, {
           headers: {
                Authorization: `Bearer ${jwt}`,   
               },
       });
    dispatch({type:GET_WALLET_TRANSACTION_SUCCESS,payload:res.data});
    console.log( "Get Wallet Transactions",res.data);   
    }   
    catch(error){
       console.log("catch error",error)
       dispatch({type:GET_WALLET_TRANSACTION_FAILURE,payload:error});
    }
  };
};
*/
export const getWalletTransactions = (walletId, jwt) => async (dispatch) => {
   dispatch({ type: GET_WALLET_TRANSACTION_REQUEST });
   try {
     const res = await api.get(`/api/wallet/transactions/get/${walletId}`, {
       headers: {
         Authorization: `Bearer ${jwt}`,
       },
     });
 
     dispatch({ type: GET_WALLET_TRANSACTION_SUCCESS, payload: res.data });
     console.log("Get Wallet Transactions", res.data);
   } catch (error) {
     console.log("catch error", error);
     dispatch({ type: GET_WALLET_TRANSACTION_FAILURE, payload: error });
   }
 };

 export const getAllTransactions =(jwt) =>{
   return async (dispatch) =>{
       dispatch({type:GET_WALLET_ALL_TRANSACTION_REQUEST});
    try{
       const res = await api.get(`/api/wallet/transactions`, {
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    dispatch({type:GET_WALLET_ALL_TRANSACTION_SUCCESS,payload:res.data});
    console.log("Get all Transactions",res.data);   
    }   
    catch(error){
       console.log("catch error",error)
       dispatch({type:GET_WALLET_ALL_TRANSACTION_FAILURE,payload:error});
    }
  };
 };

  export const depositMoney =({jwt, orderId, paymentId, navigate}) =>{
    return async (dispatch) =>{
        dispatch({type:DEPOSIT_MONEY_REQUEST});
     try{
        const res = await api.put(`/api/my-profile/wallet-payment`,null, {
            params:{
                order_id: orderId,
                payment_id: paymentId,
            },
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:DEPOSIT_MONEY_SUCCESS,payload:res.data});
     navigate("/my-profile/wallet-payment")
     console.log("Deposit Money in Wallet ",res.data);   
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:DEPOSIT_MONEY_FAILURE,payload:error});
     }
   };
  };
  
  export const paymentHandler = ({jwt,amount,paymentMethod}) =>{
    return async (dispatch) =>{
        dispatch({type:DEPOSIT_MONEY_REQUEST});
     try{
        const res = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`,null, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
      
        window.location.href=res.data.payment_url;  

     //dispatch({type:DEPOSIT_MONEY_SUCCESS,payload:res.data});
     //console.log("Payment Method",res.data);   
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:DEPOSIT_MONEY_FAILURE,payload:error});
     }
   };
  };
  
  export const transferMoney =({jwt,walletId,reqData}) =>{
    return async (dispatch) =>{
        dispatch({type:TRANSFER_MONEY_REQUEST});
     try{
        const res = await api.put(`/api/wallet/${walletId}/transfer`,reqData,{
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     dispatch({type:TRANSFER_MONEY_SUCCESS,payload:res.data});
     console.log("Transfer Money send to Wallet ",res.data);   
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:TRANSFER_MONEY_FAILURE,payload:error});
     }
   };
  };
  