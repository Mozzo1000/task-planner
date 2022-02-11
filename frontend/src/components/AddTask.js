import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskService from '../services/task.service';

function AddTask() {
    const [name, setName] = useState();

    const addTask = (e) => {
        e.preventDefault();
        TaskService.addTask(name, null).then(
            response => {
                setName("");
                console.log(response.data);
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
            }
        )
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
                    value={name}
                    onChange={e => setName(e.target.value)} 
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<AddIcon />} disabled={!name} onClick={addTask} fullWidth>Add</Button>
            </Grid>
        </Grid>
    )
}

export default AddTask;