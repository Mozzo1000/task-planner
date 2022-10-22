import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Task from "../components/Task";

function Tasks() {
  let { id } = useParams();

  const [openStatusMessage, setOpenStatusMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCloseMessage = () => {
    setOpenStatusMessage(false);
  };

  return (
    <Container>
      <Task id={id} />
      <Snackbar
        open={openStatusMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        message={statusMessage}
      />
    </Container>
  );
}

export default Tasks;
