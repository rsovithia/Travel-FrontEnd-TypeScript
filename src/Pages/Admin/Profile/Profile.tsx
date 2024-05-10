import { Avatar, Typography, Button, Box } from "@mui/material";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  location: "New York, USA",
  profilePicture: "https://via.placeholder.com/150",
};

export default function Profile() {
  return (
    <Box sx={{ padding: "25px" }}>
      <Typography variant="h2" gutterBottom>
        Profile
      </Typography>
      <Avatar
        alt="Profile Picture"
        src={mockUser.profilePicture}
        sx={{ width: 150, height: 150 }}
      />
      <Typography variant="h4" gutterBottom>
        {mockUser.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {mockUser.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Location: {mockUser.location}
      </Typography>
      <Button variant="contained">Edit Profile</Button>
    </Box>
  );
}
