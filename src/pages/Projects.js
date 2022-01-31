import React from 'react';
import Container from '@mui/material/Container';
import ProjectCard from '../components/ProjectCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Projects() {
    return (
        <Container>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <h1>Projects</h1>
                </Grid>
                <Grid item>
                    <Button variant="contained">Add project</Button>
                </Grid>
                <Grid container spacing={3} direction="row">
                    <Grid item xs={12}>
                        <ProjectCard title="Project 1" />
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectCard title="Project 2" />
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectCard title="Project 3" />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Projects;
