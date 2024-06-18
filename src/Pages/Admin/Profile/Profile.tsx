import  { useState, useEffect } from "react";
import { Avatar, Typography, Button, Box } from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    profilePicture: "",
  });

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || " ",
      email: localStorage.getItem("email") || " ",
      location: localStorage.getItem("location") || " ",
      profilePicture:
        localStorage.getItem("avatar") || "https://via.placeholder.com/150",
    };
    setUser(storedUser);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",

        textAlign: "center", // Center text content
      }}
    >
      <Typography variant="h2" gutterBottom>
        Profile
      </Typography>
      <Avatar
        alt="Profile Picture"
        src={user.profilePicture}
        sx={{ width: 150, height: 150, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {user.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Location: {user.location}
      </Typography>
      <Button variant="contained">Edit Profile</Button>
    </Box>
  );
}
