import React from 'react';
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

function Overview() {
  return (
    <Container>
        <Grid container spacing={3} direction="column" >
            <Greeting /><br />
            <AddTask />
            <Grid item>
                <Typography variant="h6">Tasks</Typography>
                <Card>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton dense component={Link} to="/tasks/1" >
                                <ListItemIcon>
                                    <Checkbox edge="start" disableRipple />
                                </ListItemIcon>
                                <ListItemText primary="task 1" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Container>
    )
}

export default Overview;
