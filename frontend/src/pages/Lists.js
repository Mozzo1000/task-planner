import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddTask from '../components/AddTask';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import LinkMUI from '@mui/material/Link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ListService from '../services/list.service';
import Chip from '@mui/material/Chip';
import { Link } from "react-router-dom";

function Lists() {
    const { id } = useParams();
    const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
    const [listInfo, setListInfo] = useState();
    const [tasks, setTasks] = useState();

    const [completedTasks, setCompletedTasks] = useState();

    const handleOpenCompletedTasks = () => {
        setOpenCompletedTasks(!openCompletedTasks);
    };

    useEffect(() => {
        if (openCompletedTasks) {
            ListService.getTasksInList(id, "done").then(
                response => {
                    setCompletedTasks(response.data);
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
    }, [openCompletedTasks])


    useEffect(() => {
        ListService.get(id).then(
            response => {
                setListInfo(response.data);
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
        ListService.getTasksInList(id).then(
            response => {
                setTasks(response.data);
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
    }, [id]);

    return (
        <Container>
            <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item>
                    <h1>{listInfo?.name}</h1>
                </Grid>
                <Grid item>
                    <IconButton><MoreHorizIcon/></IconButton>
                </Grid>
            </Grid>
            <Card>
                <CardContent>
                    <AddTask listId={id}/>
                    <List>
                        {tasks?.map((task, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton dense component={Link} to={"/tasks/" + task.id}>
                                    <ListItemIcon>
                                        <Checkbox edge="start" disableRipple />
                                    </ListItemIcon>
                                    <ListItemText primary={task.name} />
                                    <Chip label={task.status}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
            <Typography component={LinkMUI} onClick={handleOpenCompletedTasks}>Completed tasks {openCompletedTasks ? <ExpandLess /> : <ExpandMore />}</Typography>
            <Collapse in={openCompletedTasks} timeout="auto" unmountOnExit>
            <Card>
                <CardContent>
                    {completedTasks && (
                        <>
                        <List>
                            {completedTasks.map((task) => (
                                <ListItem disablePadding>
                                <ListItemButton dense>
                                    <ListItemIcon>
                                        <Checkbox edge="start" checked disableRipple />
                                    </ListItemIcon>
                                    <ListItemText sx={{textDecoration: "line-through"}} primary={task.name} />
                                </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {!completedTasks.length && (
                            <Typography>You have no completed tasks in this list.</Typography>
                        )}
                        </>
                    )}
                    
                </CardContent>
            </Card>
            </Collapse>
        </Container>
    )
}

export default Lists;
