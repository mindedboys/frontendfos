import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../State/Order/Action";
import ClipLoader from "react-spinners/ClipLoader";
import {Eventcss} from "../Profile/Event.css";
import Pagination from "../Util/Pagination";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const Orders = () => {
    const [loading, setLoading] = useState(false);
    const{auth, cart, order}=useSelector(store=>store);
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt")
    const dispatch = useDispatch();

 //Pagination     
 const[currentPage,setCurrentPage] = useState(1);
 const [postsPerPage,setPostsPerPage] = useState(4);
 const lastPostIndex = currentPage * postsPerPage;
 const firstPostIndex =lastPostIndex - postsPerPage;
 const currentPosts =order.orders.slice(firstPostIndex,lastPostIndex);    

    
useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
        dispatch(getUsersOrders(jwt))
    setLoading(false);
    },800)    
},[auth.jwt])




return(
 <>
    {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
      <div className='flex items-center flex-col'>
         <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
            <div className='space-y-5 w-full lg:w-1/2'>
              {currentPosts.map((order)=>order.items.map((item)=> <OrderCard  order={order} item={item} />))}
            </div>
            <Pagination        
                  totalPosts={order.orders.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
       </div>
     }
   </>
  )
}

export default Orders