import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";
import { styled } from "@mui/system";

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 12px;
    height: 20px;
    padding: 0 6px;
    color: #1d4dbc;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #f2f4f6;
    border-radius: 5px;
    position: absolute;
    top: 0;
    right: 15px;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

function ProjectListItem(props) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={props.project.name} />
        <StyledBadge
          badgeContent={Object.keys(props.project.lists).length}
          showZero
        ></StyledBadge>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {props.project.lists.map((list, listIndex) => (
            <ListItemButton
              key={listIndex}
              sx={{ pl: 4 }}
              component={Link}
              to={"/lists/" + list.id}
            >
              <ListItemText primary={list.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default ProjectListItem;
