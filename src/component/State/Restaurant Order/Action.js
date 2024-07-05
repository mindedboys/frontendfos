//actions.js
import axios from "axios";
import { api }  from  "../../config/api";
import { DELETE_ORDERS_FAILURE, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, GET_ALL_ORDER_FAILURE, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";



export const updateOrderStatus = ({orderId,orderStatus,jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST});
     try{
        const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`,{}, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        }
      );
        
      const updatedOrder = response.data;

     console.log("updated order",updatedOrder);
     dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:updatedOrder});
       
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:UPDATE_ORDER_STATUS_FAILURE,error});
     }
   };
};

export const fetchRestaurantsOrder = ({restaurantId,orderStatus, jwt}) =>{
    return async (dispatch) =>{
        dispatch({type:GET_RESTAURANTS_ORDER_REQUEST});
     try{
        const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`,{
            params: {order_status:orderStatus},
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     const orders =data;   
     console.log("restaurants order ------- ",orders);
     dispatch({type:GET_RESTAURANTS_ORDER_SUCCESS,payload:orders});
     }   
     catch(error){
        console.log("catch error",error)
        dispatch({type:GET_RESTAURANTS_ORDER_FAILURE,error});
     }
   };
};

export const deleteOrderAction = ({orderId,jwt}) =>{
   return async (dispatch) =>{
       dispatch({type:DELETE_ORDERS_REQUEST});
    try{
       const { data } = await api.delete(`/api/admin/deleteOrder/${orderId}`, {
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    console.log("delete order",data);
    dispatch({type:DELETE_ORDERS_SUCCESS,payload:orderId});
      
    }   
    catch(error){
       console.log("catch error",error)
       dispatch({type:DELETE_ORDERS_FAILURE,payload:error});
    }
  };
};

export const getAllOrder = ({jwt}) =>{
   return async (dispatch) =>{
       dispatch({type:GET_ALL_ORDER_REQUEST});
    try{
       const res = await api.get("/api/admin/order/all", {
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    dispatch({type:GET_ALL_ORDER_SUCCESS,payload:res.data});
    console.log("get all order",res.data);   
    }   
    catch(error){
       console.log("catch error",error)
       dispatch({type:GET_ALL_ORDER_FAILURE,payload:error});
    }
  };
 };
 