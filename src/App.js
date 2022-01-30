import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Lists from './pages/Lists';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Box sx={{flexGrow: 1, p: 3, paddingTop: "80px", paddingLeft: { md: "200px", sm: "0px" } }}>
          <Routes>
            <Route index path="/" element={<Overview />} />
            <Route path="/lists/:id" element={<Lists />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
