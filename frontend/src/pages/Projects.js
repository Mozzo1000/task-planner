import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import ProjectCard from '../components/ProjectCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ProjectService from '../services/project.service';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

function Projects() {
    const [projects, setProjects] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState();
    
    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        ProjectService.add(newProjectName).then(
            () => {
                setOpenModal(false);
                ProjectService.getAll().then(
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
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
            }
        );
    }


    useEffect(() => {
        ProjectService.getAll().then(
            response => {
                setProjects(response.data);
                console.log(response.data)
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
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <h1>Projects</h1>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClickOpenModal}>Add project</Button>
                </Grid>
                
                <Grid container spacing={3} direction="row">
                    {projects ? (
                        projects.map((project) => (
                            <Grid item xs={12}>
                                <ProjectCard title={project.name} id={project.id} />
                            </Grid>
                        ))
                    ) : (
                        <LinearProgress />
                    )}
                </Grid>
            </Grid>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Add new project</DialogTitle>
                <FormControl>
                    <form onSubmit={handleAddProject}>
                        <DialogContent>
                            <DialogContentText>
                                Fill out the information below
                            </DialogContentText>
                            <TextField required autofocus id="name" label="Name" margin="dense" fullWidth variant="standard" value={newProjectName} onChange={e => setNewProjectName(e.target.value)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Cancel</Button>
                            <Button type="submit" color="primary" onClick={handleCloseModal}>Add</Button>
                        </DialogActions>
                    </form>
                </FormControl>
            </Dialog>
        </Container>
    )
}

export default Projects;
