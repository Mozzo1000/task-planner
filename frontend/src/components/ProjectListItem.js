import React, {useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

function ProjectListItem(props) {
    const [open, setOpen] = useState(true);
    
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={props.project.name + " (" + Object.keys(props.project.lists).length + ")"} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
                {props.project.lists.map((list, listIndex) => (
                    <ListItemButton key={listIndex} sx={{ pl: 4 }} component={Link} to={"/lists/" + list.id}>
                        <ListItemText primary={list.name} />
                    </ListItemButton>
                ))}
            </List>
        </Collapse>
        </>
    )
}

export default ProjectListItem;
