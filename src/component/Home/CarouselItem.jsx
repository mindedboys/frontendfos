import React from "react";

const CarouselItem = ({image,title}) => {

    return(
        <div className='flex flex-col justify-center items-center'>
         <a href="/foods"><img className='w-[10rem] h-[10rem] lg:h-[10rem] lg:w-[10rem]
            rounded-full object-cover cursor-pointer object-center' src={image} alt="" /></a>
        <span className='py-5 font-semibold text-grey-300'>{title}</span>    
        </div>
    )
}

export default CarouselItem