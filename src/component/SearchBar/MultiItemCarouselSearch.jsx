import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItemSearch from "./CarouselItemSearch";
import { topMeal } from "../Home/topMeal";


const MultiItemCarouselSearch = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500,
        arrows:false
      };
    return(
        <div>
            
            <Slider {...settings}> 
                {topMeal.map((item)=>( 
                <CarouselItemSearch image={item.image} title={item.title} />
            ))}
            </Slider>
        </div>
    );
};

export default MultiItemCarouselSearch