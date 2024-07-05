import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import authReducer from "./Authentication/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import ingredientReducer from "./Ingredients/Reducer";
import walletReducer from "./Wallet/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";


export const rooteReducer=combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer, // for customer
    restaurantOrder:restaurantsOrderReducer, // for restaurant
    ingredients:ingredientReducer,
    wallet:walletReducer,
    withdraw:withdrawalReducer,
}); 

export const store = legacy_createStore(rooteReducer,applyMiddleware(thunk));
