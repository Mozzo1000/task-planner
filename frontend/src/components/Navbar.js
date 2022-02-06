import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ListItemText, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import ProjectList from './ProjectList';

function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    const title = "Task Planner"
    
    const pages = [
        {name: 'Overview', link: "/", icon: <CalendarTodayIcon />},
        {name: 'Planner', link: "/planner", icon: <ScheduleIcon />},
        {name: 'Projects', link: "/projects", icon: <LayersIcon />},
    ];
    const settings = [
        {name: 'Sign out', action: "logout", icon: <LogoutIcon />},
    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleSettingsItemClick = (e) => {
        if(e === "logout") {
            navigate("/login");
        }
        handleCloseUserMenu();
    };

    return (
        <>
        <Box sx={{display: 'flex'}}>
            <AppBar position="fixed" sx={{zIndex: 2, borderBottom: "1px solid #e0e0e0"}} color="inherit" elevation={0}>
                <Container maxWidth="x1">
                    <Toolbar disableGutters>
                        <Typography variant="h6" noWrap component="div" sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}>
                            {title}
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu 
                                id="menu-appbar" 
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom', 
                                    horizontal: 'left',
                                }} 
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)} 
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} component={Link} to={page.link} selected={location.pathname === page.link}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            {title}
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}></Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu 
                                sx={{mt: '45px'}} 
                                id="menu-appbar" 
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to="/settings">
                                    <Avatar /> Demo
                                </MenuItem>
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={() => handleSettingsItemClick(setting.action)}>
                                        <ListItemIcon>{setting.icon}</ListItemIcon>
                                        <ListItemText primary={setting.name}/>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                    
                </Container>
            </AppBar>
            <Drawer variant="permanent" sx={{zIndex: 1, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' }, mr: 2, display: {xs: 'none', md: 'flex'}}}>
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {pages.map((page) => (
                            <ListItem button key={page.name} component={Link} to={page.link} selected={location.pathname === page.link}>
                                <ListItemIcon>
                                    {page.icon}
                                </ListItemIcon>
                                <ListItemText primary={page.name}/>
                            </ListItem>
                        ))}
                        <Divider />
                        <ProjectList />
                    </List>
                </Box>
            </Drawer>
        </Box>
        </>
    )
}

export default Navbar
