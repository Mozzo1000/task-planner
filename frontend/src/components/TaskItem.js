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

function TaskItem(props) {
    const [checked, setChecked] = useState(false);
    const [openStatusMessage, setOpenStatusMessage] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const handleCloseMessage = () => {
        setOpenStatusMessage(false);
    };

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
            <ListItemButton component={Link} to={"/tasks/" + props.id} >    
                <ListItemText primary={props.name} />
            </ListItemButton>
            <ListItemIcon>
            <Chip label={props.status}/>
            </ListItemIcon>
        </ListItem>
        <Snackbar open={openStatusMessage} autoHideDuration={6000} onClose={handleCloseMessage} message={statusMessage} />
        </>
    )
}

export default TaskItem