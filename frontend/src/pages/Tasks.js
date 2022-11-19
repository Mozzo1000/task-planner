import React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Task from "../components/Task";

function Tasks() {
  let { id } = useParams();

  return (
    <Container>
      <Task id={id} />
    </Container>
  );
}

export default Tasks;
