import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function AddTask() {
    const [value, setValue] = useState();

    const addTask = (e) => {
        e.preventDefault();
    }

    return (
        <Grid container spacing={3} direction="row">
            <Grid item xs={10}>
                <TextField
                    id="input-with-icon-textfield"
                    placeholder="Add a new task..."
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FormatListBulletedIcon />
                        </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    autoFocus
                    fullWidth
                    onChange={e => setValue(e.target.value)} 
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<AddIcon />} disabled={!value} fullWidth>Add</Button>
            </Grid>
        </Grid>
    )
}

export default AddTask;