import React from "react";
import "./Pagination.css";


const Pagination = ({totalPosts,postsPerPage,setCurrentPage,currentPage})=> {
    let pages =[];

    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i);
    }
    
    return(
        <div className="Pagination">
            <span>&lt;&lt; Prev</span>
            {
               pages.map((page,index)=>{
                return <button key={index} onClick={()=>setCurrentPage(page)} 
                className={page===currentPage ? 'active' : ''} > {page}</button>
            })}
             <span>Next &gt;&gt;</span>
        </div>

    )
}

export default Pagination;