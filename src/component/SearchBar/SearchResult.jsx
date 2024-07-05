import React from "react";


export const SearchResult =({item,rest}) =>{

return(
    <div className="py-2 cursor-pointer">
        <div className="flex items-center">
            <img className="w-12 h-12 rounded-full" src={item?.images[0]} alt="" />
            <img className="w-12 h-12 rounded-full" src={rest?.images[0]} alt="" />
           <div className="ml-3">            
               <p><a href="/foods">{item?.name}</a></p>
               <p><a href="/foods">{rest?.name}</a></p>
           </div>   
       </div>    
    </div>         
  )  
}