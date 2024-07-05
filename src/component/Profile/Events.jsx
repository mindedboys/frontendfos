import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getAllEvents } from "../State/Restaurant/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";    
import ClipLoader from "react-spinners/ClipLoader";
import {Eventcss} from "../Profile/Event.css";
import Pagination from "../Util/Pagination";


const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const Events = ({item}) => {
    const [loading, setLoading] = useState(false);  //loading
    const{auth,restaurant} = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt")
    const dispatch = useDispatch();
    //Pagination     
    const[currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(4);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex =lastPostIndex - postsPerPage;
    const currentPosts =restaurant.events.slice(firstPostIndex,lastPostIndex);
    


useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            dispatch(getAllEvents({jwt}));
        setLoading(false);
    },800)
},[]);
    

return(
    <>
     {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
       <div>
           <div className='serv mt-5 px-5 flex flex-warp gap-5'>
              <ul>{currentPosts.map((item)=><EventCard item={item} />)}</ul>
           </div>
              <Pagination        
                  totalPosts={restaurant.events.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
       </div>
       }            
   </>  
  ) 
}

export default Events