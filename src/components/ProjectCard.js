import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

function ProjectCard(props) {
    return (
        <Grid container direction="row">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h6">{props.title}</Typography>
                </Grid>
                <Grid item>
                    <Button>Add list</Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton dense component={Link} to="/lists/1" >
                                    <ListItemText primary="List 1" />
                                </ListItemButton>
                                <MoreVertIcon />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton dense component={Link} to="/lists/1" >
                                    <ListItemText primary="List 1" />
                                </ListItemButton>
                                <MoreVertIcon />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ProjectCard;
