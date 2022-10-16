import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ProjectService from '../services/project.service';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function SelectList(props) {
    const [projects, setProjects] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const onClickList = (list) => {
        props.setCallbackList(list)
        handleCloseDialog()
    }

    useEffect(() => {
        ProjectService.getAll("?include_lists=true").then(
            response => {
                setProjects(response.data);
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
        <>
        <MenuItem onClick={handleOpenDialog}>
            <ListItemIcon><EditIcon/></ListItemIcon>
            <ListItemText>Change list</ListItemText>
        </MenuItem>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Change list for task</DialogTitle>
            <DialogContent>
                <List>
                    {projects ? (   
                        projects.map((project, index) => (
                            project.lists.map((list, listIndex) => (
                                <ListItem>
                                <ListItemButton key={listIndex} sx={{ pl: 4 }} onClick={() => onClickList(list)} >
                                    <ListItemText primary={list.name} />
                                </ListItemButton>
                                </ListItem>
                            ))
                        ))
                    ): (
                        <CircularProgress />
                    )}
                </List>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default SelectList;
