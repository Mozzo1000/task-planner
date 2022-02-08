import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ProjectService from '../services/project.service';
import CircularProgress from '@mui/material/CircularProgress';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
    const [projects, setProjects] = useState();

    useEffect(() => {
        ProjectService.getAll("?include_lists=true").then(
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
        <List>
            {projects ? (   
                projects.map((project, index) => (
                    <div key={index}>
                        <ProjectListItem project={project} />
                    </div>
                ))
            ): (
                <CircularProgress />
            )}
        </List>
    )
}

export default ProjectList;
