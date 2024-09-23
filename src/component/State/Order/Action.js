
import React from "react";
import { api } from "../../config/api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS,
  CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ALL_ADDRESS_FAILURE, GET_ALL_ADDRESS_REQUEST, GET_ALL_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS,
  GET_ADDRESS_BY_ID_REQUEST,
  GET_ADDRESS_BY_ID_SUCCESS,
  GET_ADDRESS_BY_ID_FAILURE
} from "./ActionTypes";
import { ids } from "webpack";

export const createOrder = (reqData) =>{
    return async (dispatch) =>{
        dispatch({type:CREATE_ORDER_REQUEST});
     try{
        const { data } = await api.post(`/api/orders`,reqData.order, {
            headers: {
                 Authorization: `Bearer ${reqData.jwt}`   
            }
        })
     //   if(data.payment_url){
     //       window.location.href = data.payment_url;
     //   }
     console.log("create order data",data);  
     dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
     }   
     catch(error){
        dispatch({type:CREATE_ORDER_FAILURE,payload:error});
        console.log("catch error",error)
     }
   };
};

export const getUsersOrders = (jwt) =>{
    return async (dispatch) =>{
        dispatch({type:GET_USERS_ORDERS_REQUEST});
     try{
        const { data } = await api.get(`/api/order/user`,{
            headers: {
                 Authorization: `Bearer ${jwt}`   
            }
        })
   console.log("users order",data);  
   dispatch({type:GET_USERS_ORDERS_SUCCESS,payload:data});
    
     }   
 catch(error){        
   dispatch({type:GET_USERS_ORDERS_FAILURE,payload:error});
   console.log("catch error",error)
     }
   };
};


export const updateAddress = ({addressId,data,jwt}) =>{
  return async (dispatch) =>{
      dispatch({type:UPDATE_ADDRESS_REQUEST});
   try{
      const res = await api.put(`/api/address/update/${addressId}`,data,{}, {
          headers: {
               Authorization: `Bearer ${jwt}`,   
          },
      });
   dispatch({type:UPDATE_ADDRESS_SUCCESS,payload:res.data});
   console.log("Updated address",res.data);
   }   
   catch(error){
      dispatch({type:UPDATE_ADDRESS_FAILURE,payload:error});
      console.log("catch error",error)
   }
 };
};

export const deleteAddressAction = ({addressId,jwt}) =>{
   return async (dispatch) =>{
      dispatch({type:DELETE_ADDRESS_REQUEST});

    try{
       const data = await api.delete(`/api/address/delete/${addressId}`, {
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    dispatch({type:DELETE_ADDRESS_SUCCESS,payload:addressId});
    console.log("delete address",data);      
    }   
    catch(error){
      dispatch({type:DELETE_ADDRESS_FAILURE,payload:error});
       console.log("catch error",error)
       // Handle error, dispatch an error action, etc.
    }
  };
};

export const createAddressAction = ({data, jwt}) =>{
  return async (dispatch) =>{
      dispatch({type:CREATE_ADDRESS_REQUEST});
   try{
      const res = await api.post(`/api/address/create`,data, {
          
       headers: {
               Authorization: `Bearer ${jwt}`,   
          },
          
      });

   dispatch({type:CREATE_ADDRESS_SUCCESS,payload:res.data});
   console.log("create address",res.data);   
   }   
   catch(error){
      console.log("catch error",error)
      dispatch({type:CREATE_ADDRESS_FAILURE,payload:error});
   }
 };
};

export const getAllAddress = (jwt) =>{
  return async (dispatch) =>{
      dispatch({type:GET_ALL_ADDRESS_REQUEST});
   try{
      const res = await api.get("/api/address/all", {
          headers: {
               Authorization: `Bearer ${jwt}`,   
          },
      });
   dispatch({type:GET_ALL_ADDRESS_SUCCESS,payload:res.data});
   console.log("get all address",res.data);   
   }   
   catch(error){
      console.log("catch error",error)
      dispatch({type:GET_ALL_ADDRESS_FAILURE,payload:error});
   }
 };
};

export const findAddressById = ({addressId, jwt}) =>{
  return async (dispatch) =>{
      dispatch({type:GET_ADDRESS_BY_ID_REQUEST});
   try{
      const res = await api.get(`/api/address/find/${addressId}`, {
          headers: {
               Authorization: `Bearer ${jwt}`,   
          },
      });
   dispatch({type:GET_ADDRESS_BY_ID_SUCCESS,payload:res.data});
   console.log( "get address by id",res.data);   
   }   
   catch(error){
      console.log("catch error",error)
      dispatch({type:GET_ADDRESS_BY_ID_FAILURE,payload:error});
   }
 };
};

