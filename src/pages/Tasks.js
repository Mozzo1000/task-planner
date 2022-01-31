import React, { useState } from 'react';
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

function Tasks() {
    let { id } = useParams()
    const [content, setContent] = useState({});
    const [openEditDesc, setOpenEditDesc] = useState(false);
    const [value, setValue] = React.useState("2022-01-31");
    const [status, setStatus] = React.useState("Not started");
    const [saveStatus, setSaveStatus] = React.useState(false);

    const renderChip = value => {
        let color = "";
        if (value === "Not started") {
            color = "primary"
        }else if (value === "In progress") {
            color = "secondary"
        } else if (value === "Done") {
            color = "success"
        }
        return <Chip color={color} label={status} />;
    };
    
    const handleOpenEditDesc = () => {
        setOpenEditDesc(!openEditDesc);
    }

    return (
        <Container>
            <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid container item direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <h1>Test task</h1>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <MoreHorizIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" disabled={!saveStatus}>Save</Button>
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
                        }}
                        renderInput={(params) => <TextField variant="standard" {...params}>{value}</TextField>}
                    />
                </Grid>
                <Grid item md={2}>
                    <FormControl variant="standard">
                    <Select disableUnderline inputProps={{
            name: "badge",
            id: "badge-simple"
          }} value={status} onChange={e => setStatus(e.target.value)} renderValue={renderChip}>
                        <Chip color="primary" value="Not started" label="Not started"/>
                        <Chip color="secondary" value="In progress" label="In progress"/>
                        <Chip color="success" value="Done" label="Done"/>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{<FormatAlignLeftIcon />} Description</Typography>
                    {content.description && !openEditDesc ? (
                        <Typography>{content.description}</Typography>
                    ): !openEditDesc &&(
                        <Typography sx={{fontStyle: "italic", justifyContent: "center"}}>No description available yet. <Link onClick={handleOpenEditDesc}>Edit</Link></Typography>
                    )}
                    {openEditDesc && 
                        <>
                            <TextField multiline={true} fullWidth></TextField>
                            <Button onClick={handleOpenEditDesc}>Close</Button>
                        </>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tasks;
