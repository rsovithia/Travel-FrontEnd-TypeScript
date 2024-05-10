import React from "react";
import { Drawer, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={onClose}
          sx={{ marginBottom: "10px" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/destinations"
          onClick={onClose}
          sx={{ marginBottom: "10px" }}
        >
          Destinations
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/packages"
          onClick={onClose}
          sx={{ marginBottom: "10px" }}
        >
          Packages
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          onClick={onClose}
          sx={{ marginBottom: "10px" }}
        >
          About Us
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          onClick={onClose}
          sx={{ marginBottom: "10px" }}
        >
          Contact
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
