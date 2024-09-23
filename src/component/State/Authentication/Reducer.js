import axios from "axios";
import { favorites } from "@mui/icons-material"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, FORGOT_FAILURE, FORGOT_REQUEST, FORGOT_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_FAILURE, RESET_REQUEST, RESET_SUCCESS } from "./ActionType";
import { isPresentInFavorites } from "../../config/logic";

const initialState={
    user:null,
    isLoading:false,
    error:null,
    jwt:null,
    favorites:[],
    success:null,
    users:[] 
};

export const authReducer=(state=initialState,action)=>{

           switch (action.type) {
            case REGISTER_REQUEST:
            case LOGIN_REQUEST:
            case FORGOT_REQUEST:
            case RESET_REQUEST:  
            case GET_USER_REQUEST:
            case GET_ALL_USER_REQUEST:    
            case ADD_TO_FAVORITE_REQUEST:        
               return {...state, isLoading:true, error:null, success:null}


            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:    
            return {...state, isLoading:false,jwt:action.payload, success: "Register Success"};

            case FORGOT_SUCCESS:    
            return {...state,message:action.payload}

            case GET_USER_SUCCESS:    
            return {...state, isLoading:false,user:action.payload,favorites:action.payload.favorites};

            case GET_ALL_USER_SUCCESS:    
            return {...state, isLoading:false,users:action.payload};


            case ADD_TO_FAVORITE_SUCCESS:
                return {...state, isLoading:false, error:null, favorites:isPresentInFavorites(state.favorites,action.payload)
                ? state.favorites.filter((item)=>item.id!==action.payload.id):[action.payload,...state.favorites]
            }
            case LOGOUT:
                return initialState;
                
            case REGISTER_FAILURE:
            case LOGIN_FAILURE:
            case FORGOT_FAILURE:
            case RESET_FAILURE:
            case GET_USER_FAILURE:
            case GET_ALL_USER_FAILURE:
            case ADD_TO_FAVORITE_FAILURE:        
                return {...state, isLoading:false, error:action.payload, success:null}

            default:
               return state;
     }

}

export default authReducer;
