import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  PersonAdd,
  InsertPhoto,
} from "@mui/icons-material";

import HomeIcon from "@mui/icons-material/Home";

const SideBar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "", // Including the location property
    profilePicture: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || "John Doe",
      email: localStorage.getItem("email") || "johndoe@example.com",
      location: localStorage.getItem("location") || "", // Retrieve location from localStorage
      profilePicture:
        localStorage.getItem("avatar") || "https://via.placeholder.com/150",
      role: localStorage.getItem("role") || "user",
    };
    setUser(storedUser);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#df6e1a",
          padding: "20px",
        }}
      >
        <Avatar
          alt="Profile Picture"
          src={user.profilePicture}
          sx={{ width: 150, height: 150 }}
        />
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <IconButton onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "240px",
          bgcolor: "#df6e1a",
          height: "100vh",
          color: "white",
          padding: "20px",
        }}
      >
        <List>
          <ListItem component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography>Destination</Typography>
            <ListItemText />
          </ListItem>
          <ListItem component={Link} to="/Category">
            <ListItemIcon>
              <InsertPhoto />
            </ListItemIcon>
            <Typography>Category</Typography>
            <ListItemText />
          </ListItem>
          {user.role === "admin" && (
            <ListItem component={Link} to="/AddUser">
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <Typography>Add User</Typography>
              <ListItemText />
            </ListItem>
          )}
          <ListItem component={Link} to="/dashboardRequest">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography>Destination Request</Typography>
            <ListItemText />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem component={Link} to="/Profile">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography>Profile</Typography>
            <ListItemText />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default SideBar;
