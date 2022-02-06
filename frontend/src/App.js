import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Lists from './pages/Lists';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Planner from './pages/Planner';
import AuthService from './services/auth.service';
import Login from './pages/Login';

function PrivateRoute({ children }) {
  const auth = AuthService.getCurrentUser()
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Box sx={{flexGrow: 1, p: 3, paddingTop: "80px", paddingLeft: { md: "200px", sm: "0px" } }}>
          <Routes>
            <Route index element={<PrivateRoute><Overview /></PrivateRoute>} />
            <Route path="/lists/:id" element={<PrivateRoute><Lists /></PrivateRoute>} />
            <Route path="/tasks/:id" element={<PrivateRoute><Tasks /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="/planner" element={<PrivateRoute><Planner /></PrivateRoute>} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
