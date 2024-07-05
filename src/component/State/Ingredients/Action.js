// action.js
import axios from "axios";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, DELETE_INGREDIENT_CATEGORY_FAILURE, DELETE_INGREDIENT_CATEGORY_SUCCESS, DELETE_INGREDIENT_FAILURE, DELETE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType";
import {api} from "../../config/api";

export const getIngredientsOfRestaurant = ({id, jwt}) =>{
    return async (dispatch) =>{
     try{
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}`,{
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });   
     console.log("get all ingredients", response.data);
     dispatch({type:GET_INGREDIENTS,payload:response.data}); // Assuming the response contains the ingredients data
     }   
     catch(error){
        console.log("catch error",error)
        // Handle error , dispatch an error action, etc
     }
   };
};

export const createIngredient = ({data,jwt}) =>{
    return async (dispatch) =>{
     try{
        const response = await api.post(`/api/admin/ingredients`,data, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     console.log("create ingredients",response.data);
     dispatch({type:CREATE_INGREDIENT_SUCCESS,payload:response.data});
       
     }   
     catch(error){
        console.log("catch error",error)
        // Handle error, dispatch an error action, etc.
     }
   };
};

export const createIngredientCategory = ({data,jwt}) =>{
    console.log("data",data,"jwt",jwt);
    return async (dispatch) =>{
     try{
        const response = await api.post(`/api/admin/ingredients/category`,data, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     console.log("create ingredients category",response.data);
     dispatch({type:CREATE_INGREDIENT_CATEGORY_SUCCESS,payload:response.data});
       
     }   
     catch(error){
      dispatch({type:CREATE_INGREDIENT_CATEGORY_FAILURE,payload:error});
        console.log("catch error",error)
       
        // Handle error, dispatch an error action, etc.
     }
   };
};

export const getIngredientCategory = ({id, jwt}) =>{
    return async (dispatch) =>{
     try{
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,{
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });   
     console.log("get ingredients category", response.data);
     dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS,payload:response.data}); // Assuming the response contains the ingredients data
     }   
     catch(error){
      dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE,payload:error});
        console.log("catch error",error)
        // Handle error , dispatch an error action, etc
     }
   };
};

export const updateStockOfIngredient = ({id,jwt}) =>{
    return async (dispatch) =>{
     try{
        const {data} = await api.put(`/api/admin/ingredients/${id}/stock`,{}, {
            headers: {
                 Authorization: `Bearer ${jwt}`,   
            },
        });
     console.log("update ingredients stok",data);
     dispatch({type:UPDATE_STOCK,payload:data});
       
     }   
     catch(error){
        console.log("catch error",error)
        // Handle error, dispatch an error action, etc.
     }
   };
};

export const deleteIngredient = ({ingredientId,jwt}) =>{
   return async (dispatch) =>{
    try{
       const response = await api.delete(`/api/admin/ingredients/item/${ingredientId}`, {
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    console.log("delete ingredients",response.data);
    dispatch({type:DELETE_INGREDIENT_SUCCESS,payload:response.data});
      
    }   
    catch(error){
      dispatch({type:DELETE_INGREDIENT_FAILURE,payload:error});
       console.log("catch error",error)
       // Handle error, dispatch an error action, etc.
    }
  };
};

export const deleteIngredientCategory = ({ingredientCategoryId,jwt}) =>{
   return async (dispatch) =>{
    try{
       const response = await api.delete(`/api/admin/ingredients/restaurant/category/${ingredientCategoryId}`,{
           headers: {
                Authorization: `Bearer ${jwt}`,   
           },
       });
    console.log("delete ingredients category",response.data);
    dispatch({type:DELETE_INGREDIENT_CATEGORY_SUCCESS,payload:response.data});
      
    }   
    catch(error){
     dispatch({type:DELETE_INGREDIENT_CATEGORY_FAILURE,payload:error});
       console.log("catch error",error)
      
       // Handle error, dispatch an error action, etc.
    }
  };
};