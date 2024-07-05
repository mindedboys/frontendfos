import { CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_BY_ID_SUCCESS, GET_ALL_ADDRESS_SUCCESS, GET_ALL_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, UPDATE_ADDRESS_SUCCESS } from "./ActionTypes";

const initialState = {
    loading: false,
    orders: [],
    error:null, 
    userAddress: [],
    update: null,
};

export const orderReducer = (state = initialState, {type, payload,action}) =>{
    switch(type){
        case GET_USERS_ORDERS_REQUEST:
            return{
                ...state,error:null,loading:true
            };
        case GET_USERS_ORDERS_SUCCESS:
            return{
                    ...state,error:null,loading:false,orders:payload
                };
        case GET_USERS_ORDERS_FAILURE:
            return{
                 ...state,error:payload,loading:false
           }; 

           case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading:false,
                userAddress:action.payload
              };                           
        
        case GET_ALL_ADDRESS_SUCCESS:
            return {
                ...state,
                loading:false,
                userAddress:action.payload
              };
        case GET_ADDRESS_BY_ID_SUCCESS:
            return {
                    ...state,
                    loading:false,
                    userAddress:action.payload
                  };  
        case UPDATE_ADDRESS_SUCCESS:
            const updatedAddress = state.userAddress.map((userAddress)=>
                userAddress.id === action.payload.id?action.payload:userAddress
            );
            return{
                ...state,loading:false,userAddress:updatedAddress
                
              };
        case DELETE_ADDRESS_SUCCESS: 
        return {
            ...state,
            loading:false,
            userAddress:state.userAddress.filter((item)=>item.id !== action.payload)             
          };    
                  
 default:
    return state;   
           
    }
};

export default orderReducer;