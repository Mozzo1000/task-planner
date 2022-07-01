import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskService from '../services/task.service';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

function AddTask(props) {
    const [name, setName] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    

    const addTask = () => {
        let listId = null;
        if (props.listId) {
            listId = props.listId;
        }

        TaskService.addTask(name, listId).then(
            response => {
                setName("");
                console.log(response.data);
                handleClose();
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
        <>
        <Grid container spacing={3} direction="row" alignItems="center" sx={{display: {xs: "none", sm: "flex"}}}>
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
        <Box sx={{display: {xs: "flex", sm: "none"} }}>
            <Fab color="primary" sx={{position: "absolute", bottom: 32, right: 32}} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </Box>

        <Drawer anchor="bottom" open={open} onClose={handleClose}>
            <TextField placeholder="Add a new task..." autoFocus fullWidth 
                    value={name} onChange={e => setName(e.target.value)} 
                    onKeyDown={keyPress} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton disabled={!name} onClick={addTask}>
                                <SendIcon color="primary" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Drawer>

        </>
    )
}

export default AddTask;