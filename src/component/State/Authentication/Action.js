import axios from "axios" 
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, FORGOT_FAILURE, FORGOT_REQUEST, FORGOT_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_FAILURE, RESET_REQUEST, RESET_SUCCESS } from "./ActionType"
import { API_URL, api } from "../../config/api"


export const registerUser=(reqData) =>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success",data)
    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error",error)
    }
}  

export const loginUser=(reqData) =>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const{data}=await axios.post(`${API_URL}/auth/singnin`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.rol==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("login success",data)
    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("error",error)
    }
}  

export const ForgotUser=(reqData) => async (dispatch) =>{
    dispatch({type:FORGOT_REQUEST});
    try {
        const {data} = await api.post(`api/users/rest-password/send-otp`,reqData);
        dispatch({type:FORGOT_SUCCESS,payload:reqData})        
        console.log("Forgot success",reqData)
    } catch (error) {
        dispatch({type:FORGOT_FAILURE,payload:error})
        console.log("error",error)
    }
  }; 

export const ResetUser=(reqData,id) =>async(dispatch)=>{
    dispatch({type:RESET_REQUEST})
    try {
        const{data}=await axios.post(`${API_URL}/api/users/users/rest-password/verify-otp?id=${id}`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt)
            reqData.navigate("/");        
        dispatch({type:RESET_SUCCESS,payload:data.jwt})
        console.log("Reset success",data)
    } catch (error) {
        dispatch({type:RESET_FAILURE,payload:error})
        console.log("error",error)
    }
}



export const getUser=(jwt) =>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const{data}=await api.get(`/api/users/profile`,{
            headers:{
                 Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log("user profile",data)
    } catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("error",error)
    }
}  

export const getAllUser=(jwt) =>async(dispatch)=>{
    dispatch({type:GET_ALL_USER_REQUEST})
    try {
        const{data}=await api.get(`/api/users/profile/all`,{
            headers:{
                 Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_ALL_USER_SUCCESS,payload:data})
        console.log("user all profile",data)
    } catch (error) {
        dispatch({type:GET_ALL_USER_FAILURE,payload:error})
        console.log("error",error)
    }
}  

export const addTOFavorite=({jwt, restaurantId}) =>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
        const{data}=await api.put(`/api/restaurants/${restaurantId}/add-favorites`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
           }
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("added to favorite",data)
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("logout success")
    } catch (error) {
        console.log("error",error)
    }
}