import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
  Badge,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, AccountCircle, Brightness4, Brightness7, Help } from "@mui/icons-material";  // Added Help Icon
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "./Theme";
import { Link } from "react-router-dom"; // Import Link for routing

const NavbarPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notificationCount, setNotificationCount] = useState(4);
  const { darkMode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home page after sign-out
    setDrawerOpen(false);
  };

  const handleSignIn = () => {
    navigate("/signin");
    setDrawerOpen(false);
  };

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  const pages = [
    { name: "Dietary", path: "/dietary" },
    { name: "Meal Planning", path: "/meal" },
    { name: "Library", path: "/recipes" },
    { name: "Monitoring", path: "/health-monitoring" },
    { name: "Dashboard", path: "/analytics" },
  ];

  const appBarBackgroundColor = darkMode ? "#2C3E50" : "#2196F3"; // Blue for the app bar

  return (
    <AppBar position="sticky" sx={{ backgroundColor: appBarBackgroundColor }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        {/* Wrap Typography with Link to make it clickable */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Senior Nutrition Guides
          </Typography>
        </Link>

        {/* Mobile / Tablet Layout */}
        {isMobile || isTablet ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List
                sx={{
                  backgroundColor: darkMode ? "#34495E" : "#F5F5F5", // Light Gray in Light mode
                  color: darkMode ? "#fff" : "#212121", // Dark Gray for readability
                  width: isTablet ? "250px" : "300px", // Adjust drawer width for tablet
                }}
              >
                {pages.map((page) => (
                  <ListItem
                    button
                    key={page.name}
                    onClick={() => handleNavigation(page.path)}
                    sx={{ color: darkMode ? "#fff" : "#212121" }}
                  >
                    <ListItemText primary={page.name} />
                  </ListItem>
                ))}
                <ListItem button onClick={() => handleNavigation("/notifications")}>
                  <ListItemText primary="Notifications" />
                  <Badge badgeContent={notificationCount} color="error">
                    <Notifications />
                  </Badge>
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    toggleTheme();
                    setDrawerOpen(false);
                  }}
                  sx={{ color: darkMode ? "#fff" : "#212121" }}
                >
                  <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/help")}> {/* Added Help item */}
                  <ListItemText primary="Help" />
                  <Help />
                </ListItem>
                {!isAuthenticated ? (
                  <ListItem button onClick={handleSignIn}>
                    <ListItemText primary="Sign In" />
                  </ListItem>
                ) : (
                  <ListItem button onClick={handleSignOut}>
                    <ListItemText primary="Sign Out" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <Box display="flex" alignItems="center">
            {/* Desktop Navbar */}
            {pages.map((page) => (
              <Button
                key={page.name}
                color="inherit"
                onClick={() => handleNavigation(page.path)}
                sx={{
                  marginLeft: "20px",
                  color: "#FFFFFF", // White text on buttons
                  "&:hover": {
                    backgroundColor: "#4CAF50", // Green hover effect
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
            <IconButton color="inherit" onClick={() => handleNavigation("/notifications")}>
              <Badge badgeContent={notificationCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button color="inherit" onClick={() => handleNavigation("/help")}> {/* Added Help Button */}
              Help
            </Button>
            {isAuthenticated && (
              <IconButton color="inherit" onClick={() => handleNavigation("/profile")}>
                <AccountCircle />
              </IconButton>
            )}
            {!isAuthenticated ? (
              <Button color="inherit" onClick={handleSignIn}>
                Sign In
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavbarPage;
