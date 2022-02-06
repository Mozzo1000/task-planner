import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import { ListItemButton, ListItemText } from '@mui/material';
import Greeting from '../components/Greeting';
import AddTask from '../components/AddTask';
import { Link } from "react-router-dom";
import TaskService from "../services/task.service";
import LinearProgress from '@mui/material/LinearProgress';
function Overview() {
    const [tasks, setTasks] = useState();

    useEffect(() => {
        TaskService.getAllTasks().then(
            response => {
                setTasks(response.data);
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
    }, []);


    return (
        <Container>
            <Grid container spacing={3} direction="column" >
                <Greeting /><br />
                <AddTask />
                <Grid item>
                    <Typography variant="h6">Tasks</Typography>
                    <Card>
                        {tasks ? (
                        <List>
                            {tasks.map((task, index) => (
                               <ListItem disablePadding>
                                    <ListItemButton dense component={Link} to={"/tasks/" + task.id} >
                                        <ListItemIcon>
                                            <Checkbox edge="start" disableRipple />
                                        </ListItemIcon>
                                        <ListItemText primary={task.name} />
                                    </ListItemButton>
                                </ListItem> 
                            ))}
                        </List>
                        ) : (
                            <LinearProgress />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
        )
}

export default Overview;
