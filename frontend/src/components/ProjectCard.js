import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProjectService from "../services/project.service";
import ListService from "../services/list.service";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

function ProjectCard(props) {
  const [lists, setLists] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [newListName, setNewListName] = useState();

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddList = (e) => {
    e.preventDefault();
    ListService.add(newListName, props.id).then(
      () => {
        setOpenModal(false);
        ProjectService.getLists(props.id).then(
          (response) => {
            setLists(response.data);
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
  };

  useEffect(() => {
    ProjectService.getLists(props.id).then(
      (response) => {
        setLists(response.data);
        console.log(response.data);
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
  }, []);

  return (
    <Grid container direction="row">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">{props.title}</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleClickOpenModal}>Add list</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <List>
              {lists ? (
                lists.lists.map((list, index) => (
                  <ListItem disablePadding>
                    <ListItemButton
                      dense
                      component={Link}
                      to={"/lists/" + list.id}
                    >
                      <ListItemText primary={list.name} />
                    </ListItemButton>
                    <MoreVertIcon />
                  </ListItem>
                ))
              ) : (
                <LinearProgress />
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add new list</DialogTitle>
        <FormControl>
          <form onSubmit={handleAddList}>
            <DialogContent>
              <DialogContentText>
                Fill out the information below
              </DialogContentText>
              <TextField
                required
                autoFocus
                id="name"
                label="Name"
                margin="dense"
                fullWidth
                variant="standard"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" color="primary" onClick={handleCloseModal}>
                Add
              </Button>
            </DialogActions>
          </form>
        </FormControl>
      </Dialog>
    </Grid>
  );
}

export default ProjectCard;
