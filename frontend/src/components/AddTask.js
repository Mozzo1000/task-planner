import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskService from '../services/task.service';

function AddTask(props) {
    const [name, setName] = useState();

    const addTask = () => {
        TaskService.addTask(name, null).then(
            response => {
                setName("");
                console.log(response.data);
                if (props.callback) {
                    props.callback();
                }
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

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            addTask();
        }
    }

    return (
        <Grid container spacing={3} direction="row" alignItems="center">
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
                    variant="outlined"
                    autoFocus
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    onKeyDown={keyPress}
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" startIcon={<AddIcon />} disabled={!name} onClick={addTask} fullWidth>Add</Button>
            </Grid>
        </Grid>
    )
}

export default AddTask;