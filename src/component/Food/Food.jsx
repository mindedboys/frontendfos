import { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import MultiItemCarousel from '../Home/MultiItemCarousel'
import FoodCard from './FoodCard'
import { topMeal } from "../Home/topMeal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodAction, getMenuItemsByRestaurantId, searchMenuItem } from "../State/Menu/Action";
import "./FoodCard.css";
import { getAllCategoryAction, getAllRestaurantsAction} from '../State/Restaurant/Actions'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'


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
    const { keyword, city, id } = useParams();


useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        dispatch(getAllRestaurantsAction(jwt))
        dispatch(getAllFoodAction(jwt))
        dispatch(getAllCategoryAction(jwt))
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
    }, [selectedCategory, foodType])


    const handleFilter = async (e) => {
        await setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }


    const handleFilterCategory = async (e, value) => {
        await setSelectedCategory(value)
        console.log(e.target.value, e.target.name, value)
    }

const handleFilterPrice = (e,value) => {
    

}


return (
        <div className="bg-white">
            <section className='p-10 lg:py-10 text-black lg:px-20'>
                <p className='text-2xl font-semibold text-black py-0 pb-10'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <main className="mx-auto px-4 sm:px-6 lg:px-20">
                <div className="flex items-baseline justify-between border-b border-gray-400 pb-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Restaurant Food Deliver</h1>
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
                                    <Typography variant="h6" sx={{ paddingBottom: "1rem" }}> Food_Category</Typography>
                                    <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                        <RadioGroup onChange={handleFilterCategory} name="food_category"
                                            value={selectedCategory}>
                                            {restaurant.categories.map((item) => (
                                                <FormControlLabel
                                                    key={item}
                                                    value={item.name}
                                                    control={<Radio sx={{color:"red"}}/>}
                                                    label={item.name}
                                                />))}
                                        </RadioGroup>
                                    </FormControl>
                             </div>
                        {/* Product grid */}
                        <div className="lg:col-span-4 w-full">
                            <div className='flex flex-wrap justify center bg-white py-1'>
                                {menu.search.map((item) => <FoodCard item={item} />)}
                                {restaurant.restaurants.map((item) => <RestaurantCard item={item} />)}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Food;