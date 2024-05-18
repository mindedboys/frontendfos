import { Height } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

const EventCard = () =>{

return(
        <div>
            <Card sx={{width:345}}>
                <CardMedia
                sx={{Height:345}}  
                  image = 'https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg' />
                                  
                <CardContent>
                    <Typography variant="h5" >Mahakal Fast Food</Typography>
                    <Typography variant="body2">50% Off on Your First Order</Typography>
                    <div className='py-2 space-y-2'>
                        <p>{"Mumbai"}</p>
                        <p className="text-5m text-blue-500">June 14,2024 12:00 AM</p>
                        <p className="text-5m text-red-500">June 24,2024 12:00 PM</p>
                    </div>
            </CardContent>
   { false &&  <CardActions>
                    <IconButton>
                          <DeleteIcon/>
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}

export default EventCard