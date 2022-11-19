import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'material-ui-snackbar-provider'

const container = document.getElementById("root");
const root = createRoot(container);

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    low: createColor("#ffeb3b"),
    medium: createColor("#03a9f4"),
    high: createColor("#ff9800"),
    urgent: createColor("#f44336"),
  },
});

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
serviceWorkerRegistration.register();
