import React from "react";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';




const EventCard = ({item}) =>{

       
return(
        <div >
            <Card sx={{width:270}} className="hover:scale-90 duration-300">
                <CardMedia sx={{Height:200}} />
                    <img className="rounded-2xl" src={item.images[0]} alt="" />                  
                <CardContent>
                    <Typography variant="h5" >{item.name}</Typography>
                    <div className='py-2 space-y-2'>
                        <p>Location :- {item.location}</p>
                        <p className="text-5m text-blue-500">Start :- {item.startedAt}</p>
                        <p className="text-5m text-red-500">End :- {item.endsAt}</p>
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