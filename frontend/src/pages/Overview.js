import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import Greeting from "../components/Greeting";
import AddTask from "../components/AddTask";
import TaskService from "../services/task.service";
import LinearProgress from "@mui/material/LinearProgress";
import TaskItem from "../components/TaskItem";
import TodoCard from "../components/TodoCard";
import useAlert from '../components/Alerts/useAlert';

function Overview() {
  const [tasks, setTasks] = useState();
  const snackbar = useAlert();

  const onTaskAdded = () => {
    TaskService.getAllTasks("?include_done=false").then(
      (response) => {
        setTasks(response.data);
        console.log(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        snackbar.showError(resMessage);
      }
    );
  };

  useEffect(() => {
    TaskService.getAllTasks("?include_done=false").then(
      (response) => {
        setTasks(response.data);
        console.log(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        snackbar.showError(resMessage);
      }
    );
  }, []);

  return (
    <Container>
      <Grid container spacing={3} direction="column" justifyContent="center">
        <Grid item>
          <Greeting />
          <br />
          <AddTask callback={onTaskAdded} />
        </Grid>
        <Grid item>
          <Typography variant="h6">Tasks</Typography>
          <Card>
            {tasks ? (
              <List>
                {tasks.map((task, index) => (
                  <TaskItem
                    id={task.id}
                    name={task.name}
                    status={task.status}
                    list={task.list}
                    onSuccess={onTaskAdded}
                  />
                ))}
              </List>
            ) : (
              <LinearProgress />
            )}
          </Card>
        </Grid>
        <Grid container item direction="row">
          <Grid item sm={12} lg={4}>
            <TodoCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Overview;
