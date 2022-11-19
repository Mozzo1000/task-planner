import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import TaskService from "../services/task.service";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { ICalendar } from "datebook";
import DownloadIcon from "@mui/icons-material/Download";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReactMarkdown from "react-markdown";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SelectList from "./SelectList";
import useAlert from './Alerts/useAlert';

function Task(props) {
  const [content, setContent] = useState({});
  const [openEditDesc, setOpenEditDesc] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [saveButton, setSaveButton] = useState(false);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [openEditName, setOpenEditName] = useState(false);
  const [priority, setPriority] = useState("");
  const [list, setList] = useState("");

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const openMenu = Boolean(menuAnchorEl);
  const snackbar = useAlert();

  const createICS = () => {
    const icalendar = new ICalendar({
      title: name,
      description: description,
      start: new Date(),
      end: new Date(value),
    });
    console.log(value);
    icalendar.download();
  };

  const renderChip = (value) => {
    let color = "primary";
    if (value === "Not started") {
      color = "primary";
    } else if (value === "In progress") {
      color = "secondary";
    } else if (value === "Done") {
      color = "success";
    }
    return <Chip color={color} label={status} />;
  };

  const renderChipPriority = (value) => {
    let color = "low";
    let label = "Low";
    if (value === "1") {
      color = "low";
      label = "Low";
    } else if (value === "2") {
      color = "medium";
      label = "Medium";
    } else if (value === "3") {
      color = "high";
      label = "High";
    } else if (value === "4") {
      color = "urgent";
      label = "Urgent";
    }
    return <Chip color={color} label={label} />;
  };

  const handleClickMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenEditDesc = () => {
    setOpenEditDesc(!openEditDesc);
  };

  const closeAndClearEditDesc = () => {
    handleOpenEditDesc();
    setDescription(content.description);
    setSaveButton(false);
  };

  const save = () => {
    let modifiedData = {};
    if (content.description !== description) {
      modifiedData["description"] = description;
      handleOpenEditDesc();
    }
    if (content.due_date !== value) {
      modifiedData["due_date"] = value;
    }

    if (content.status !== status) {
      modifiedData["status"] = status;
    }

    if (content.name !== name) {
      modifiedData["name"] = name;
      setOpenEditName(false);
    }
    if (content.priority !== priority) {
      modifiedData["priority"] = priority;
    }

    if (list) {
      if (!content.list) {
        modifiedData["list"] = list.id;
      } else if (content.list.id !== list.id) {
        modifiedData["list"] = list.id;
      }
    }

    TaskService.editTask(props.id, modifiedData).then(
      (response) => {
        console.log(response.data);
        setSaveButton(false);
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
      }
    );
  };

  useEffect(() => {
    TaskService.getTask(props.id).then(
      (response) => {
        console.log(response.data);
        setContent(response.data);
        setStatus(response.data.status);
        setValue(response.data.due_date);
        setDescription(response.data.description);
        setName(response.data.name);
        setPriority(response.data.priority.toString());
        setList(response.data.list);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        snackbar.showError(resMessage);
      }
    );
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          {!openEditName ? (
            <>
              <h1>
                {name}
                <Breadcrumbs>
                  {list && (
                    <Typography variant="subtitle1">{list.name}</Typography>
                  )}
                  <Typography variant="subtitle1">{name}</Typography>
                </Breadcrumbs>
              </h1>
            </>
          ) : (
            <>
              <TextField
                onChange={(e) => (
                  setName(e.target.value), setSaveButton(e.target.value)
                )}
                value={name}
              />
            </>
          )}
        </Grid>
        <Grid item>
          <IconButton>
            <IconButton onClick={handleClickMenu}>
              <MoreHorizIcon />
            </IconButton>
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={setOpenEditName}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Rename</ListItemText>
            </MenuItem>
            <SelectList
              setCallbackList={(e) => (
                setList(e), setSaveButton(true), handleCloseMenu()
              )}
            />
            <MenuItem onClick={() => createICS()}>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText>Download ICS</ListItemText>
            </MenuItem>
          </Menu>
          <Button variant="contained" onClick={save} disabled={!saveButton}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableRow>
          <TableCell
            variant="footer"
            sx={{ fontSize: 14, padding: 0, border: 0 }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <CelebrationIcon fontSize="small" />
              Status
            </Stack>
          </TableCell>
          <TableCell sx={{ border: 0 }}>
            <FormControl variant="standard">
              <Select
                disableUnderline
                inputProps={{
                  name: "badge",
                  id: "badge-simple",
                }}
                value={status}
                onChange={(e) => (
                  setStatus(e.target.value), setSaveButton(e.target.value)
                )}
                renderValue={renderChip}
              >
                <Chip color="primary" value="Not started" label="Not started" />
                <Chip
                  color="secondary"
                  value="In progress"
                  label="In progress"
                />
                <Chip color="success" value="Done" label="Done" />
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="footer"
            sx={{ fontSize: 14, padding: 0, border: 0 }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <AccessTimeIcon fontSize="small" />
              Due date
            </Stack>
          </TableCell>
          <TableCell sx={{ border: 0 }}>
            <MobileDateTimePicker
              value={value}
              clearable
              InputProps={{
                startAdornment: <AccessTimeIcon />,
                disableUnderline: false,
              }}
              onChange={(newValue) => {
                setValue(newValue);
                setSaveButton(newValue);
              }}
              label="Due date"
              ampm={false}
              renderInput={(params) => (
                <TextField variant="standard" {...params}>
                  {value}
                </TextField>
              )}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="footer"
            sx={{ fontSize: 14, padding: 0, border: 0 }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <PriorityHighIcon fontSize="small" />
              Priority
            </Stack>
          </TableCell>
          <TableCell sx={{ border: 0 }}>
            <FormControl variant="standard">
              <Select
                disableUnderline
                inputProps={{
                  name: "badge-priority",
                  id: "badge-simple-priority",
                }}
                value={priority}
                onChange={(e) => (
                  setPriority(e.target.value), setSaveButton(e.target.value)
                )}
                renderValue={renderChipPriority}
              >
                <Chip color="urgent" value="4" label="Urgent" />
                <Chip color="high" value="3" label="High" />
                <Chip color="medium" value="2" label="Medium" />
                <Chip color="low" value="1" label="Low" />
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
      </Table>
      <br />
      <hr />
      {description && !openEditDesc ? (
        <Typography onDoubleClick={handleOpenEditDesc}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Typography>
      ) : (
        !openEditDesc && (
          <Typography sx={{ fontStyle: "italic", justifyContent: "center" }}>
            No description available yet.{" "}
            <Link onClick={handleOpenEditDesc}>Edit</Link>
          </Typography>
        )
      )}
      {openEditDesc && (
        <>
          <TextField
            onChange={(e) => (
              setDescription(e.target.value), setSaveButton(e.target.value)
            )}
            multiline={true}
            fullWidth
            value={description}
          ></TextField>
          <Button onClick={closeAndClearEditDesc}>Cancel</Button>
        </>
      )}
    </Container>
  );
}

export default Task;
