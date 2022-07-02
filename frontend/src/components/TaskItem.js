import React, {useState} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import TaskService from '../services/task.service';
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Task from './Task';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function TaskItem(props) {
    const [checked, setChecked] = useState(false);
    const [openStatusMessage, setOpenStatusMessage] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleCloseMessage = () => {
        setOpenStatusMessage(false);
    };

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    }
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }

    const markTaskDone = (id) => {
        setChecked(!checked);
        const modifiedData = {"status": "Done"}
        TaskService.editTask(id, modifiedData).then(
            response => {
                console.log(response.data);
                if (props.onSuccess) {
                    props.onSuccess();
                }
                setStatusMessage(response.data.message);
                setOpenStatusMessage(true);
                setChecked(false);
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setStatusMessage(resMessage);
                setOpenStatusMessage(true);
                if (props.onError) {
                    props.onError();
                }
            }
        )
    };

    return (
        <>
        <ListItem dense>
            <ListItemIcon>
                <Checkbox checked={checked} onChange={() => markTaskDone(props.id)} edge="start" />
            </ListItemIcon>
            <ListItemButton onClick={handleOpenDrawer} >    
                <ListItemText primary={props.name} />
            </ListItemButton>
            <ListItemIcon>
            <Chip label={props.status}/>
            </ListItemIcon>
        </ListItem>
        <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
            <Grid container spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    {/* ADD CLOSE BUTTON */}
                    <IconButton onClick={handleCloseDrawer}>
                        <CloseIcon />
                    </IconButton>
                    {/* ADD OPEN IN SEPARATE WINDOW */}
                </Grid>
                <Grid item>
                    <Button variant="contained" component={Link} to={"/tasks/" + props.id} startIcon={<OpenInNewIcon />}>
                        Open
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Task id={props.id}/>
                </Grid>
            </Grid>
        </Drawer>
        <Snackbar open={openStatusMessage} autoHideDuration={6000} onClose={handleCloseMessage} message={statusMessage} />
        </>
    )
}

export default TaskItem