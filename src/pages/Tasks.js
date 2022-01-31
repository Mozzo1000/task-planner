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

function Tasks() {
    let { id } = useParams()
    const [content, setContent] = useState({});
    const [openEditDesc, setOpenEditDesc] = useState(false);

    const handleOpenEditDesc = () => {
        setOpenEditDesc(!openEditDesc);
    }

    return (
        <Container>
            <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12}>
                    <h1>Test task</h1>
                    <Breadcrumbs>
                        <Typography variant="subtitle1">List 1</Typography>
                        <Typography variant="subtitle1">Test task</Typography>
                    </Breadcrumbs>
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
