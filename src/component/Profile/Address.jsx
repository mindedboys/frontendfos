import React, { useState } from "react";
import { AddressCard } from "../Cart/AddressCard";
import { useSelector } from "react-redux";
import {Eventcss} from "../Profile/Event.css";
import Pagination from "../Util/Pagination";



const Address = (item) => {
const {auth,cart}=useSelector((store) => store)
//Pagination     
const[currentPage,setCurrentPage] = useState(1);
const [postsPerPage,setPostsPerPage] = useState(6);
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex =lastPostIndex - postsPerPage;
const currentPosts =auth.user?.address.slice(firstPostIndex,lastPostIndex);

return (
        <>
        <div>
            <h1 className="text-center font-semibold text-2xl py-10">Select Your Address</h1>
            <div className="cerv flex gap-5 flex-wrap justify-center">
             <ul>{currentPosts?.map((item) =>(<AddressCard item={item} showButton={false} />))}</ul>
            </div>
            <Pagination        
                  totalPosts={auth.user?.address.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
        </div>
      </>    
    )
}

export default Address;