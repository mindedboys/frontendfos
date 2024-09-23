import { Grid } from "@mui/material";
import React from "react";
import WalletDetails from "./WalletDetails";


export const MyWallet = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <WalletDetails />
                </Grid>
            </Grid>
        </div>
    )
}

export default MyWallet;