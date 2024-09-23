import { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MultiItemCarousel from '../Home/MultiItemCarousel'
import FoodCard from './FoodCard'
import { topMeal } from "../Home/topMeal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodAction, getMenuItemsByRestaurantId, searchMenuItem } from "../State/Menu/Action";
import "./FoodCard.css";
import { getAllCategoryAction, getAllRestaurantsAction, searchCategoryAction, searchRestaurantAction } from '../State/Restaurant/Actions'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import filterSlice, { setFilterValue } from '../Util/filterSlice'
import { Button, Chip } from 'material-ui'
import { InputLabel } from 'material-ui'
import { Select } from 'material-ui'
import { Box, OutlinedInput } from '@material-ui/core'
import MenuItem from '@mui/material/MenuItem';
import SearchBar from '../SearchBar/SearchBar';



const sortOptions = [
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]


const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Food = () => {
    const [loading, setLoading] = useState(false);
    const [foodType, setFoodType] = useState("all")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { auth, restaurant, menu } = useSelector(store => store);
    const [selectedCategory, setSelectedCategory] = useState("");
    const {city, id } = useParams();
    const [topRestaurant, setTopRestaurant] = useState([]);
    const [topFood, setTopFood] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [food, setFood] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [category, setCategory] = useState([]);
    const [filteredfoodData, setFilteredFoodData] = useState([]); 
    const [searchData,setSearchData]=useState('');

    useEffect(() => {
        setFilteredFoodData(
        menu.search.filter(item =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }, [keyword,menu.search]);
  
  console.log("filteredfoodData",filteredfoodData)
  
  useEffect(() => {
    if (keyword === "") {
      return
    }
    handleSearchFood();
    handleSearchRestaurant();
    handleSearchCategory();
  }, [keyword])

  const handleSearchData=(data)=>{
    setSearchData(data);
  }

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

console.log("search ",searchData);





    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getAllRestaurantsAction(jwt))
            dispatch(getAllFoodAction(jwt))
            dispatch(getAllCategoryAction(jwt))
            setTopRestaurant(restaurant.restaurants);
            setSelectedCategory(restaurant.categories);
            setLoading(false);
        }, 800)
    }, [])


    useEffect(() => {
        dispatch(
            getMenuItemsByRestaurantId({
                jwt,
                restaurantId: id,
                vegetarian: foodType === "vegetarian",
                nonveg: foodType === "non_vegetarian",
                seasonal: foodType === "seasonal",
                foodCategory: selectedCategory
            }));
            setTopFood(menu.search);
    }, [selectedCategory, foodType])


    const handleFilter = async (e) => {
        await setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }


    const handleFilterCategory = async (e, value) => {
        await setSelectedCategory(value)
        console.log(e.target.value, e.target.name, value)
    }
    const dropdownMenuProps={
        menuStyle:{
          border: "1px solid black",
          borderRadius: "5%",
          backgroundColor: 'lightgrey',
        },
      }

    const handleFilterPrice = (e, value) => {
    }


    const filterOption = ["Pure Veg", "Non Veg", "Rs. 300-Rs.600", "Less than Rs. 300", "New Food", "New Restaurant"]
    const [activeBtn, setActiveBtn] = useState(null);
    const handleFilterBtn = (filterName) => {
        setActiveBtn(activeBtn === filterName ? null : filterName);
        dispatch(setFilterValue(activeBtn));
    }

    //const data = filterVal ? filteredData : menu.search;
    const filterVal = useSelector((state => state.filterSlice.filterVal));
    const filteredData = topFood.filter(item => {
        if (!filterVal) return true;
        switch (filterVal) {
            case "Pure Veg": return item.vegetarian
            case "Non Veg": return
            case "Rs. 300-Rs.600": return item.price.slice(1, 4) >= "300" && item.price.slice(1, 4) <= "600"
            case "Less than Rs. 300": return item.price <= "300"
            case "New Food": return item.creationDate
            default: return true;
        }
        console.log(".........", filteredData + "======" + filterVal);

    })


    return (
        <div className="bg-white">
            <section className='p-10 lg:py-10 text-black lg:px-20'>
                <p className='text-2xl font-semibold text-black py-0 pb-10'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <main className="mx-auto px-4 sm:px-6 lg:px-20">
                <h1 className="text-2xl text-bold tracking-tight text-gray-900 py-3">Restaurant Food Deliver</h1>
                <div className="flex items-baseline justify-between border-b border-gray-400">
                    <FormControl sx={{py: 3 ,width: 200 }}>
                        <Select
                            name="food category"
                            dropDownMenuProps={dropdownMenuProps}
                            value={selectedCategory}
                            onChange={handleFilterCategory}
                            input={<OutlinedInput id="" label="food category" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected?.map((value) => <Chip key={value.id} label={value.name} />
                                        
                                    )}
                                </Box>
                            )}
                        >
                            {restaurant.categories.map((item) => (
                                <MenuItem className='bg-black text-black'
                                onClick={() => handleFilterCategory(item.value)}
                                key={item.id}>
                                    {item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="flex gap-3 py-3">
                        {filterOption.map(filterName => (<button onClick={() => handleFilterBtn(filterName)}
                            className={`filterBtn bg-black ${activeBtn === filterName ? "active" : ""}`}>
                            <p>{filterName}</p></button>))}
                    </div>

                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </MenuButton>
                            </div>

                            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name}>
                                            {({ focus }) => (
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        focus ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            )}
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                {/*   
                <section className="pt-[2rem] lg:flex pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <div className="space-y-3 lg:w-[20%] text-black filter">
                                    <Typography variant="h6" sx={{ paddingBottom: "1rem" }}>Food_Type</Typography>
                                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                        <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                            {foodTypes.map((item) => (
                                                <FormControlLabel
                                                    key={item.value}
                                                    value={item.value}
                                                    control={<Radio sx={{color:"red"}} />}
                                                    label={item.value}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                <Divider />
                             </div>
                    </div>
                </section>
                */}
                {/* Product grid */}
                <div className="lg:col-span-4 w-full">
                    <div className='flex flex-wrap justify center bg-white py-1'>
                        {menu.search.map((food) => <FoodCard food={filterVal ? filteredData : food} />)}
                    </div>
                    <div className='flex flex-wrap justify center bg-white py-1'>
                        {restaurant.restaurants.map((item) => <RestaurantCard item={filterVal ? filteredData : item} />)}
                    </div>
                    <SearchBar onSearch={handleSearchData}/>  
                </div>
            </main>
        </div>
    )
}

export default Food;