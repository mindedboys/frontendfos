//Reducer.js
import { DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, GET_ALL_TRANSACTION_FAILURE, GET_ALL_TRANSACTION_REQUEST, GET_ALL_TRANSACTION_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_TRANSACTION_FAILURE, GET_WALLET_TRANSACTION_REQUEST, GET_WALLET_TRANSACTION_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./ActionType";



const initialState ={
    userWallet: {},
    restaurantWallet: {},
    adminWallet: {},
    Transactions:[],
    laoding: false,
    error: null,
};


export const walletReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_USER_WALLET_REQUEST:
        case DEPOSIT_MONEY_REQUEST:
        case TRANSFER_MONEY_REQUEST:
        case GET_WALLET_TRANSACTION_REQUEST:
        case GET_ALL_TRANSACTION_REQUEST:     
             return{
                    ...state,
                     loading:true,
                     error:null,
                    };
    
        case GET_ALL_TRANSACTION_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                Transactions:action.payload,
              };
        case GET_WALLET_TRANSACTION_SUCCESS:
              return{
                ...state,
                loading: false,
                error: null,
                Transactions:action.payload,
              };
     
       case GET_USER_WALLET_SUCCESS:
       case TRANSFER_MONEY_SUCCESS:
        return{
            ...state,
            userWallet: action.payload,
            restaurantWallet: action.payload,
            adminWallet: action.payload,
            loading: false,
            error: null,
            };

        case DEPOSIT_MONEY_SUCCESS:
            return {
                ...state,
                userWallet:action.payload,
                loading: false,
                error: null,
            };
     
        case GET_USER_WALLET_FAILURE:
        case DEPOSIT_MONEY_FAILURE:
        case TRANSFER_MONEY_FAILURE:
        case GET_WALLET_TRANSACTION_FAILURE:
        case GET_ALL_TRANSACTION_FAILURE:    
            return{
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;                
    };
};
export default walletReducer;