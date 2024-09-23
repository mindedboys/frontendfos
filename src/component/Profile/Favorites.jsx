import React, { useState } from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";
import {Eventcss} from "../Profile/Event.css";  
import Pagination from "../Util/Pagination";


export const Favorites = () => {
const {auth}=useSelector((store) => store)
//Pagination     
const[currentPage,setCurrentPage] = useState(1);
const [postsPerPage,setPostsPerPage] = useState(6);
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex =lastPostIndex - postsPerPage;
const currentPosts = auth.favorites.slice(firstPostIndex,lastPostIndex);

console.log("-------",auth.favorites);
    
return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
            <div className='cerv flex flex-warp gap-3 justify-center'>
               <ul> {currentPosts.map((item)=><RestaurantCard item={item}/>)}</ul>
            </div>
            <Pagination        
                  totalPosts={auth.favorites.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
        </div>
    )
}

export default Favorites