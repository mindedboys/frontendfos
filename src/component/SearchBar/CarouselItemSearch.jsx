import React from "react";

const CarouselItemSearch = ({image,title}) => {

    return(
        <div className='flex flex-col justify-center items-center'>
         <a href="/foods"><img className='w-[3rem] h-[3rem] 
            rounded-full object-cover cursor-pointer object-center' src={image} alt="" /></a>
        <span className='py-5 text-sm'>{title}</span>    
        </div>
    )
}

export default CarouselItemSearch