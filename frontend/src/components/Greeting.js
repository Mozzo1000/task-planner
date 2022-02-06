import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function Greeting() {
    const today = new Date().toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    const time = new Date().getHours();
    let timeOfDay = "";

    if (time < 12) {
        timeOfDay = "Good morning"
    } else if (time < 18) {
        timeOfDay = "Good afternoon"
    } else {
        timeOfDay = "Good evening"
    }

    return (
        <>
        <Grid container item direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h4">👋 {timeOfDay}, Andreas!</Typography>
            </Grid>
            <Grid item>
                <Typography>{today}</Typography>
            </Grid>
        </Grid>
        <br />
        <Divider/>
        </>
        )
}

export default Greeting;