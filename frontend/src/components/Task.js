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
import DateTimePicker from '@mui/lab/MobileDateTimePicker';
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
import Snackbar from '@mui/material/Snackbar';
import { ICalendar } from 'datebook'
import DownloadIcon from '@mui/icons-material/Download';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReactMarkdown from 'react-markdown';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function Task(props) {
    const [content, setContent] = useState({});
    const [openEditDesc, setOpenEditDesc] = useState(false);
    const [value, setValue] = useState("");
    const [status, setStatus] = useState("");
    const [saveButton, setSaveButton] = useState(false);
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [openEditName, setOpenEditName] = useState(false);
    const [openStatusMessage, setOpenStatusMessage] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const openMenu = Boolean(menuAnchorEl);
      
    const createICS = () => {
        const icalendar = new ICalendar({
            title: name,
            description: description,
            start: new Date(),
            end: new Date(value),
          })
          console.log(value);
          icalendar.download();
    };

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

        TaskService.editTask(props.id, modifiedData).then(
            response => {
                console.log(response.data);
                setSaveButton(false);
                setStatusMessage(response.data.message);
                setOpenStatusMessage(true);
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
            }
        )
    };

    useEffect(() => {
        TaskService.getTask(props.id).then(
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
                setStatusMessage(resMessage);
                setOpenStatusMessage(true);
            }
        )
    }, []);

    const handleCloseMessage = () => {
        setOpenStatusMessage(false);
    };

    return (
        <Container>
            <Grid container spacing={3} direction="row" alignItems="center" justifyContent="space-between">
                <Grid item>
                    {!openEditName ? (
                        <>
                        <h1>{name}
                        <Breadcrumbs>
                            {content.list && (
                                <Typography variant="subtitle1">{content.list.name}</Typography>
                            )}
                            <Typography variant="subtitle1">{name}</Typography>
                        </Breadcrumbs>
                        </h1>
                        </>
                    ): (
                        <>
                        <TextField onChange={e => (setName(e.target.value), setSaveButton(e.target.value))} value={name }/>
                        
                        </>
                    )}
                </Grid>
                <Grid item>
                    <IconButton>
                        <IconButton onClick={handleClickMenu} ><MoreHorizIcon /></IconButton>
                    </IconButton>
                    <Menu anchorEl={menuAnchorEl} open={openMenu} onClose={handleCloseMenu}>
                        <MenuItem onClick={setOpenEditName}>
                            <ListItemIcon><EditIcon/></ListItemIcon>
                            <ListItemText>Rename</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => createICS()}>
                            <ListItemIcon><DownloadIcon/></ListItemIcon>
                            <ListItemText>Download ICS</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Button variant="contained" onClick={save} disabled={!saveButton}>Save</Button>
                </Grid>
            </Grid>
                
            <Table size="small">
                <TableRow>
                    <TableCell sx={{border: 0}}>Status</TableCell>
                    <TableCell sx={{border: 0}}>
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
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{border: 0}}>Due date</TableCell>
                    <TableCell sx={{border: 0}}>
                        <DateTimePicker
                            value={value}
                            clearable
                            InputProps={{ startAdornment: <AccessTimeIcon />, disableUnderline: false }}
                            onChange={(newValue) => {
                                setValue(newValue);
                                setSaveButton(newValue);
                            }}
                            label="Due date"
                            ampm={false}
                            renderInput={(params) => <TextField variant="standard" {...params}>{value}</TextField>}
                        />
                    </TableCell>
                </TableRow>
            </Table>
            <br />
            <hr />
            {description && !openEditDesc ? (
                <Typography onDoubleClick={handleOpenEditDesc}><ReactMarkdown>{description}</ReactMarkdown></Typography>
            ): !openEditDesc &&(
                <Typography sx={{fontStyle: "italic", justifyContent: "center"}}>No description available yet. <Link onClick={handleOpenEditDesc}>Edit</Link></Typography>
            )}
            {openEditDesc && 
                <>
                    <TextField onChange={e => (setDescription(e.target.value), setSaveButton(e.target.value))} multiline={true} fullWidth value={description}></TextField>
                    <Button onClick={closeAndClearEditDesc}>Cancel</Button>
                </>
            }
            <Snackbar open={openStatusMessage} autoHideDuration={6000} onClose={handleCloseMessage} message={statusMessage} />
        </Container>
    )
}

export default Task;
