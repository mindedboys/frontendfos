import { Accordion, AccordionDetails, AccordionSummary, Button, FormGroup } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from "react";
import { Restaurant, category } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import categorizeIngredients from "../Util/categrizeIngredients";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";
import ClipLoader from "react-spinners/ClipLoader";



const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8de4d3", 
  };



const MenuCard = ({item}) => {
    const [loading, setLoading] = useState(false);
    const [selectedIngredients,setSelectedIngredients]=useState([])
    const {auth,restaurant,menu}=useSelector(store => store)
    const dispatch = useDispatch();


const handleCheckBoxchange = async (itemName)=>{ 
    if(selectedIngredients.includes(itemName)){
       await setSelectedIngredients(
            selectedIngredients.filter((item) =>item!==itemName))
           }
    else{
        await setSelectedIngredients([...selectedIngredients,itemName])
    }
};


const handleAddItemToCart = async(e) =>{
    e.preventDefault()
    const reqData = {
        token:localStorage.getItem("jwt"),
        cartItem: {
            foodId:item.id,
            quantity:1,
            ingredients:selectedIngredients,
        },
    };
    setLoading(true);
    setTimeout(()=>{
        dispatch(addItemToCart(reqData))   
    setLoading(false);
    },800)    
};


return (
    <>
     {loading ?<ClipLoader color={'#8de4d3'} loading={loading} cssOverride={CSSProperties} size={50} /> :
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className='lg:flex items-center justify-between box'>
          <div className='lg:flex items-center lg:gap-5'>
            <img className='w-[7rem] h-[7rem] object-cover' 
            src={item.images[0]} alt="" />
         <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
           <p className="font-semibold text-xl">{item.name}</p>
           <p>₹{item.price}</p>
           <p className="text-gray-400">{item.description}</p> 
        </div>   
        </div>  
          </div>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={handleAddItemToCart}>
                <div className="flex gap-5 flex-wrap">
                    {
                    Object.keys(categorizeIngredients(item.ingredients)).map((category) =>(
                 <div>
                      <p>{category}</p>          
                      <FormGroup>
                          {categorizeIngredients(item.ingredients)[category].map(
                            (item) =>( 
                             <FormControlLabel 
                               key={item.id} 
                               control={<Checkbox 
                               onChange={()=>
                               handleCheckBoxchange(item.name)} 
                            />} 
                        label={item.name} />
                      ))}
                    </FormGroup>
                </div>            
                    ))}

                </div>
                <div>
                    <div className="pt-5">
                       <Button variant="contained"  disabled={false} type="submit">{true?"Add to Cart":"Out of Stock" }</Button>
                    </div>
                </div>    
            </form>
        </AccordionDetails>
    </Accordion>
        }
    </>
    )
}

export default MenuCard