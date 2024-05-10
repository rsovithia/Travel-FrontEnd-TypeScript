import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  PersonAdd,
  InsertPhoto,
} from "@mui/icons-material";

const mockUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  location: "New York, USA",
  profilePicture: "https://via.placeholder.com/150",
};

export default function SideBar() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#df6e1a",
          padding: "25px",
        }}
      >
        <Avatar
          alt="Profile Picture"
          src={mockUser.profilePicture}
          sx={{ width: 150, height: 150 }}
        />
        <Typography variant="h4" gutterBottom>
          {mockUser.name}
        </Typography>
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
            {" "}
            {/* Use Link component from react-router-dom */}
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography>Destination</Typography>
            <ListItemText />
          </ListItem>
          <ListItem component={Link} to="/Category">
            {" "}
            <ListItemIcon>
              <InsertPhoto />
            </ListItemIcon>
            <Typography>Category</Typography>
            <ListItemText />
          </ListItem>
          <ListItem component={Link} to="/AddUser">
            {" "}
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <Typography>Add User</Typography>
            <ListItemText />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem component={Link} to="/Profile">
            {" "}
            {/* Use Link component from react-router-dom */}
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
}
