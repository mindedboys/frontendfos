import { Restaurant, favorites } from "@mui/icons-material";

export const isPresentInFavorites=(favorites,restaurant)=>{
    for(let item of favorites){
         if(restaurant.id===item.id){
            <div>
                {item.name}
            </div>
            return true

         }
         return false;
    }
    
} 