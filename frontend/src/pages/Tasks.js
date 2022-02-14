import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DatePicker from '@mui/lab/MobileDatePicker';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import TaskService from '../services/task.service';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

function Tasks() {
    let { id } = useParams()
    const [content, setContent] = useState({});
    const [openEditDesc, setOpenEditDesc] = useState(false);
    const [value, setValue] = useState("");
    const [status, setStatus] = useState("");
    const [saveButton, setSaveButton] = useState(false);
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [openEditName, setOpenEditName] = useState(false);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const openMenu = Boolean(menuAnchorEl);

    const renderChip = value => {
        let color = "primary";
        if (value === "Not started") {
            color = "primary"
        }else if (value === "In progress") {
            color = "secondary"
        } else if (value === "Done") {
            color = "success"
        }
        return <Chip color={color} label={status} />;
    };

    const handleClickMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
      };
      const handleCloseMenu = () => {
        setMenuAnchorEl(null);
      };
    
    const handleOpenEditDesc = () => {
        setOpenEditDesc(!openEditDesc);
    }

    const closeAndClearEditDesc = () => {
        handleOpenEditDesc();
        setDescription(content.description);
        setSaveButton(false);
    }

    const save = () => {
        let modifiedData = {};
        if (content.description != description) {
            modifiedData["description"] = description;
            handleOpenEditDesc();
        }
        if (content.due_date != value) {
            modifiedData["due_date"] = value;
        }

        if (content.status != status) {
            modifiedData["status"] = status;
        }

        if (content.name != name) {
            modifiedData["name"] = name;
            setOpenEditName(false);
        }

        TaskService.editTask(id, modifiedData).then(
            response => {
                console.log(response.data);
                setSaveButton(false);
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
    };

    useEffect(() => {
        TaskService.getTask(id).then(
            response => {
                setContent(response.data);
                setStatus(response.data.status);
                setValue(response.data.due_date);
                setDescription(response.data.description);
                setName(response.data.name);
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
            {content ? (
            <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid container item direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                {!openEditName ? (
                                    <h1>{name}</h1>
                                ): (
                                   <TextField onChange={e => (setName(e.target.value), setSaveButton(e.target.value))} value={name}/> 
                                )}
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <IconButton onClick={handleClickMenu} ><MoreHorizIcon /></IconButton>
                                </IconButton>
                                <Menu anchorEl={menuAnchorEl} open={openMenu} onClose={handleCloseMenu}>
                                    <MenuItem onClick={setOpenEditName}><EditIcon/> Rename</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={save} disabled={!saveButton}>Save</Button>
                    </Grid>
                </Grid>
                <Grid item md={2}>
                    <Breadcrumbs>
                        <Typography variant="subtitle1">List 1</Typography>
                        <Typography variant="subtitle1">Test task</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item md={2}>
                    <DatePicker
                        value={value}
                        clearable
                        InputProps={{ startAdornment: <AccessTimeIcon />, disableUnderline: false }}
                        onChange={(newValue) => {
                            setValue(newValue);
                            setSaveButton(newValue);
                        }}
                        renderInput={(params) => <TextField variant="standard" {...params}>{value}</TextField>}
                    />
                </Grid>
                <Grid item md={2}>
                    <FormControl variant="standard">
                        <Select disableUnderline inputProps={{
                                name: "badge",
                                id: "badge-simple"
                            }} 
                            value={status} onChange={e => (setStatus(e.target.value), setSaveButton(e.target.value))} renderValue={renderChip}>
                            <Chip color="primary" value="Not started" label="Not started"/>
                            <Chip color="secondary" value="In progress" label="In progress"/>
                            <Chip color="success" value="Done" label="Done"/>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{<FormatAlignLeftIcon />} Description</Typography>
                    {description && !openEditDesc ? (
                        <Typography onDoubleClick={handleOpenEditDesc}><pre style={{fontFamily: "inherit"}}>{description}</pre></Typography>
                    ): !openEditDesc &&(
                        <Typography sx={{fontStyle: "italic", justifyContent: "center"}}>No description available yet. <Link onClick={handleOpenEditDesc}>Edit</Link></Typography>
                    )}
                    {openEditDesc && 
                        <>
                            <TextField onChange={e => (setDescription(e.target.value), setSaveButton(e.target.value))} multiline={true} fullWidth value={description}></TextField>
                            <Button onClick={closeAndClearEditDesc}>Cancel</Button>
                        </>
                    }
                </Grid>
            </Grid>
            ) : (
                <LinearProgress />
            )}
        </Container>
    )
}

export default Tasks;
