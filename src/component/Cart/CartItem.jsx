import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";
import { useNavigate } from "react-router-dom";




export const CartItem = ({item}) => {
    const{auth, cart}=useSelector(store=>store);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const jwt=localStorage.getItem("jwt");

    const handleUpdateCartItem = async(value) =>{
        if(value===-1 && item.quantity===1){
           await handleRemoveCartItem()
        }
      const data ={cartItemId:item.id, quantity:item.quantity+value}  
     await dispatch(updateCartItem({data,jwt}))  
    }
const handleRemoveCartItem = async() =>{
    await dispatch(removeCartItem({cartItemId:item.id, jwt:auth.jwt || jwt}))
}

return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className="w-[5rem] h-[5rem] rounded-2xl object-cover hover:scale-95 duration-300" 
                    src={item.food.images[0]} alt="" />
                </div>
                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food.name}</p>
                       
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton color="primary" onClick={()=>handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                    
                                </div>
                                <IconButton color="primary" onClick={()=>handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                  <div>
                    <p> ₹{item.totalPrice} </p>
                  </div>
                </div>
                </div>
                <div className="pt-3 space-x-2">
                    {item.ingredients.map((ingredient)=><Chip label={ingredient}/>)}
            </div>

        </div>
    );
};

export default CartItem