import { Grid } from "@mui/material";
import React from "react";
import OrderTable from "../Orders/OrderTable";


export const RestaurantDashboard = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <OrderTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default RestaurantDashboard;