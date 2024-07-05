import React,{useState} from "react";
import styles from "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../State/Menu/Action";
import { SearchResult } from "./SearchResult";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


export const SearchBar = () =>{
  const [search,setSearch] = useState([]);
  const [keyword,setKeyword] = useState([]); 
  const dispatch = useDispatch()
  const jwt=localStorage.getItem("jwt");
  const{menu,restaurant}=useSelector((store) => store);      



const handleSearch = (event) => {
   dispatch(searchMenuItem({jwt,keyword:event.target.value}))

}   

const clearInput =() =>{
    setSearch([]);
    setKeyword("");
}
    

return (
    <>
      <div className="search">
        <div className="searchInput">
            <input type="text" placeholder="Search..." onChange={handleSearch} />
              <div className="searchIcon">
                 {search.length=== 0 ? ( <SearchIcon /> ):( <CloseIcon  id="clearBtn" onClick={clearInput} /> )}  
              </div>
        </div>
        { search.length !==0 && <div>
           
         </div>}
         <div className="dataResult"> 
           {menu.search.map((item) => <SearchResult item={item} /> )}
           {restaurant.restaurants.map((rest) => <SearchResult rest={rest} /> )}
           </div>
        
    </div>
    </>
  );
};
export default SearchBar ;