import React from 'react';
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
import Link from '@mui/material/Link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

function Lists() {
    const [openCompletedTasks, setOpenCompletedTasks] = React.useState(false);

    const handleOpenCompletedTasks = () => {
        setOpenCompletedTasks(!openCompletedTasks);
    };

    let { id } = useParams()
    return (
        <Container>
            <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item>
                    <h1>List {id}</h1>
                </Grid>
                <Grid item>
                    <IconButton><MoreHorizIcon/></IconButton>
                </Grid>
            </Grid>
            <Card>
                <CardContent>
                    <AddTask />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton dense>
                                <ListItemIcon>
                                    <Checkbox edge="start" disableRipple />
                                </ListItemIcon>
                                <ListItemText primary="task 1" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton dense>
                                <ListItemIcon>
                                    <Checkbox edge="start" disableRipple />
                                </ListItemIcon>
                                <ListItemText primary="task 2" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <Typography component={Link} onClick={handleOpenCompletedTasks}>Completed tasks {openCompletedTasks ? <ExpandLess /> : <ExpandMore />}</Typography>
            <Collapse in={openCompletedTasks} timeout="auto" unmountOnExit>
            <Card>
                <CardContent>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton dense>
                                <ListItemIcon>
                                    <Checkbox edge="start" checked disableRipple />
                                </ListItemIcon>
                                <ListItemText sx={{textDecoration: "line-through"}} primary="task 3" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton dense>
                                <ListItemIcon>
                                    <Checkbox edge="start" checked disableRipple />
                                </ListItemIcon>
                                <ListItemText sx={{textDecoration: "line-through"}} primary="task 4" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            </Collapse>
        </Container>
    )
}

export default Lists;
