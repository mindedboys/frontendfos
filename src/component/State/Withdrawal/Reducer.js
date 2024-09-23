import { stat } from "fs";
import { ADD_PAYMENT_DETAILS_SUCCESS, GET_ALL_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, UPDATE_PAYMENT_DETAILS_SUCCESS, WITHDRAWALPROCEED_REQUEST, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./ActionType";
import { error } from "console";


const initialState ={
    withdrawal: null,
    history: [],
    loading: false,
    error: null,
    PaymentDetails:null,
    AdminPaymentDetails:[],
    requests: [],
    update: null,
};

const withdrawalReducer = (state = initialState, action)=>{

    switch(action.type){
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_WITHDRAWAL_REQUEST_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case WITHDRAWAL_SUCCESS:
            return{
                ...state,
                withdrawal:action.payload,
                loading:false,
                error:null,
            };
        case ADD_PAYMENT_DETAILS_SUCCESS:
        case GET_PAYMENT_DETAILS_SUCCESS:
                return {
                        ...state,
                        PaymentDetails:action.payload,                    
                        loading:false,
                        error: null,
                    }
        case GET_ALL_PAYMENT_DETAILS_SUCCESS:
            return {
                    ...state,
                    AdminPaymentDetails:action.payload,                    
                    loading:false,
                    error: null,
                }  
        case UPDATE_PAYMENT_DETAILS_SUCCESS:
            const updatePaymentDetails = state.AdminPaymentDetails.map((AdminPaymentDetails)=>
                AdminPaymentDetails.id === action.payload.id?action.payload:AdminPaymentDetails
            );
            return{
                ...state,
                loading:false,
                AdminPaymentDetails:updatePaymentDetails
              };

        case WITHDRAWAL_PROCEED_REQUEST:
            return{
                ...state,
                requests: state.requests.map((item)=>
                item.id == action.payload.id ? action.payload : item
                ),
                loading:false,
                error:null,
            };              

        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return{
                ...state,
                history:action.payload,
                loading:false,
                error:null,
            };
        
        case GET_WITHDRAWAL_REQUEST_SUCCESS:
            return{
                ...state,
                requests:action.payload,
                loading:false,
                error:null,
            };
        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_WITHDRAWAL_REQUEST_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        default:
            return state;                              
    }
};

export default withdrawalReducer;
