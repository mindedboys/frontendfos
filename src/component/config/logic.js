import { Restaurant, favorites } from "@mui/icons-material";

export const isPresentInFavorites=(favorites,restaurant)=>{
    for(let item of favorites){
         if(restaurant.id===item.id){
            
            return true

         }
         return false;
    }
    
} 