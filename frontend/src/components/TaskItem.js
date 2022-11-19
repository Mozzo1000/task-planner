import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import TaskService from "../services/task.service";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Task from "./Task";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SelectList from "./SelectList";
import useAlert from './Alerts/useAlert';

function TaskItem(props) {
  const [checked, setChecked] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const snackbar = useAlert();

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu(contextMenu == null ? { mouseX: e.clientX + 2, mouseY: e.clientY - 6 } : null);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const changeList = (id, list_id) => {
    const modifiedData = { list: list_id };
    TaskService.editTask(id, modifiedData).then(
      (response) => {
        console.log(response.data);
        if (props.onSuccess) {
          props.onSuccess();
        }
        snackbar.showSuccess(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        snackbar.showError(resMessage);
        if (props.onError) {
          props.onError();
        }
      }
    );
  };

  const markTaskDone = (id) => {
    setChecked(!checked);
    const modifiedData = { status: "Done" };
    TaskService.editTask(id, modifiedData).then(
      (response) => {
        console.log(response.data);
        if (props.onSuccess) {
          props.onSuccess();
        }
        snackbar.showSuccess(response.data.message);
        setChecked(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        snackbar.showError(resMessage);
        if (props.onError) {
          props.onError();
        }
      }
    );
  };

  return (
    <>
      <ListItem dense onContextMenu={handleContextMenu}>
        <ListItemIcon>
          <Checkbox
            checked={checked}
            onChange={() => markTaskDone(props.id)}
            edge="start"
          />
        </ListItemIcon>
        <ListItemButton onClick={handleOpenDrawer}>
          <ListItemText primary={props.name} />
        </ListItemButton>
        <ListItemIcon>
          {props.list && (
            <Chip
              color="secondary"
              label={props.list.name}
              sx={{ marginRight: "10px" }}
            />
          )}
          <Chip label={props.status} />
        </ListItemIcon>
      </ListItem>

      <Menu open={contextMenu !== null} onClose={handleCloseContextMenu} anchorReference="anchorPosition" anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}>
        <MenuItem disabled>Actions</MenuItem>
        <SelectList setCallbackList={(e) => (changeList(props.id, e.id), handleCloseContextMenu())} />
      </Menu>

      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <Container>
          <br />
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              {/* ADD CLOSE BUTTON */}
              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
              {/* ADD OPEN IN SEPARATE WINDOW */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to={"/tasks/" + props.id}
                startIcon={<OpenInNewIcon />}
              >
                Open
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Task id={props.id} />
            </Grid>
          </Grid>
        </Container>
      </Drawer>
    </>
  );
}

export default TaskItem;
