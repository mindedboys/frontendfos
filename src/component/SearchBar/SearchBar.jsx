import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from "react";
import styles from "./SearchBar.css";
import { searchMenuItem } from '../State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction, searchCategoryAction, searchRestaurantAction } from '../State/Restaurant/Actions';
import MultiItemCarouselSearch from './MultiItemCarouselSearch';
import PlaceIcon from '@mui/icons-material/Place';




export const SearchBar = (props) => {
  console.log('props',props);
  const {onSearch} = props; 
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [food, setFood] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt");
  const { menu, restaurant } = useSelector((store) => store);



  useEffect(() => {
    if (keyword === "") {
      return
    }
    handleSearchFood();
    handleSearchRestaurant();
    handleSearchCategory();
  }, [keyword])


  const handleSearchFood = async () => {
    await dispatch(searchMenuItem({ jwt, keyword }))
    setFood(menu.search);
  }

  const handleSearchRestaurant = async () => {
    await dispatch(searchRestaurantAction(keyword, jwt))
    setRestaurantData(restaurant.search);
  }

  const handleSearchCategory = async () => {
    await dispatch(searchCategoryAction(keyword, jwt))
    setCategory(restaurant.searchCategory);
  }

   const handleChangekey=(e)=>{
    setKeyword(e.target.value);
    if(onSearch){
          onSearch(e.target.value);
    }  
    console.log("search bARsearch ",e.target.value,"   "+ onSearch);
   };
  const clearInput = () => {
    setKeyword([]);
  }
  /*
  let x = ""
  function handleSearchQuery(e){
      let val = e.target.value
      if(e.keyCode == 13){
        setKeyword(val)
      }
  }
  */


  const [searchResult, setSearchResult] = useState([]);
  function handleSearchFunctionality() {
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      searchResultFun();
      setLoading(false);
    }, 800)
  }, [])


  const searchResultFun = (value) => {
    dispatch(getAllRestaurantsAction(jwt))
    setSearchResult(restaurant.restaurants);
  }


  return (
    <div className='search'>
      <div className="searchInput">
        <input
          onClick={(e) => searchResultFun(e.target.value)}
          type="text" className="border p-5 focus:outline-none focus:shadow-lg gap-3" placeholder="Street City State"  />
          <PlaceIcon className="searchIcon " sx={{height: 50, width:50}}/>
        <input
          value={keyword}
          onChange={handleChangekey}
         // onKeyDown={handleSearchQuery}
          className='border-2 px-10 py-3 focus:outline-none' type="text"
          placeholder="Search for Food and Restaurant" />
        <div className="searchIcon">
          {keyword.length === 0 ? (<SearchIcon />) : (<CloseIcon id="clearBtn" onClick={clearInput} />)}
        </div>
      </div>
      <section className="lg:px-20">
        <p className='text-2xl font-semibold text-grey-400 py-5 pb-7 px-10'>Top Meels</p>
        <MultiItemCarouselSearch />
      </section>
      <div className='w-full md:w[800px]'>
        {food.map((foodItem) => (
          keyword.length !== 0 &&
          <div className="dataResult ">
            <div className="py-5 cursor-pointer">
              <div className="flex items-center">
                <a href="/foods"><img className="w-20 h-20 rounded-2xl" src={foodItem.images[0]} alt="" /></a>
                <div className="ml-3">
                  <p className='text-lg'><a href="/foods">{foodItem.name}</a></p>
                  <p className='text-sm'>{foodItem.foodCategory.name}</p>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {restaurantData.map((restaurantItem) => (
          keyword.length !== 0 &&
          <div className="dataResult">
            <div className="py-2 cursor-pointer">
              <div className="flex items-center">
                <a href="/foods"><img className="w-20 h-20 rounded-2xl" src={restaurantItem.images[0]} alt="" /></a>
                <div className="ml-3">
                  <a href="/foods"><p>{restaurantItem.name}</p></a>
                  <a href="/foods"><p>{restaurantItem.address.streetAddress}, {restaurantItem.address.city}</p></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {category.map((categoryItem) => (
          keyword.length !== 0 &&
          <div className="dataResult">
            <div className="py-2 cursor-pointer">
              <div className="flex items-center">
                <a href="/foods">  <img className="w-20 h-20 rounded-2xl" src={categoryItem.images[0]} alt="" /></a>
                <div className="ml-3">
                  <p className='text-xl'><a href="/foods">{categoryItem.name}</a></p>
                  <p className='text-sm'>{categoryItem.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">

        <div onClick={handleSearchFunctionality}>
          <div>
            <ul>
              {searchResult.map((item) => {
                <li className="text-black">{item.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
export default SearchBar;
