import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    low: createColor('#ffeb3b'),
    medium: createColor('#03a9f4'),
    high: createColor('#ff9800'),
    urgent: createColor('#f44336'),
  },
});


ReactDOM.render(
  <React.StrictMode>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
       <ThemeProvider theme={theme}>
        <App />
       </ThemeProvider>
     </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);