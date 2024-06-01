import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../Auth/auth";
import config from "../../Api/config";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
}

interface Post {
  id: number;
  name: string;
  description: string;
  status: string;
  category: {
    name: string;
  };
  province: {
    name: string;
  };
  created_at: string;
}

const getPostsByUser = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/auth/my-posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getFavoritesByUser = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched favorites:", data); // Console the fetched favorites data here
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Navbar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<Post[]>([]);

  useEffect(() => {
    const storedUser: User = {
      id: localStorage.getItem("id") || "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      profilePicture: localStorage.getItem("avatar") || "/mnt/data/image.png",
      role: localStorage.getItem("role") || "",
    };

    if (storedUser.id) {
      setUser(storedUser);
    }

    // Fetch posts by user
    getPostsByUser().then((data) => setPosts(data.data));

    // Fetch favorites by user and log the result
    getFavoritesByUser().then((data) => {
      console.log("Favorites data:", data.data);
      setFavorites(data.data);
    });
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ marginTop: 15 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          textAlign: "center",
        }}
      >
        {user && (
          <>
            <Avatar
              alt={user.name}
              src={user.profilePicture}
              sx={{ width: 56, height: 56, marginBottom: 1 }}
            />
            <Typography fontSize="20px" fontWeight={600} variant="body1">
              {user.name}
            </Typography>
            <Typography fontSize="14px" variant="body2" color="textSecondary">
              {user.id}
            </Typography>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
          textAlign: "center",
        }}
      >
        {user?.role === "admin" ? (
          <>
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "20px 0 0 20px",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Dashboard
            </Button>
            <Button
              type="button"
              className="logout"
              onClick={handleLogout}
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "0 20px 20px 0",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "20px 0 0 20px",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDialogOpen}
            >
              Post
            </Button>
            <Button
              type="button"
              className="logout"
              onClick={handleLogout}
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "0 20px 20px 0",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "left", marginBottom: 2 }}>
        <Button
          sx={{
            textDecoration: showTable ? "underline" : "none",
            marginRight: 2,
          }}
          onClick={() => setShowTable(true)}
        >
          Table
        </Button>
        <Button
          sx={{
            textDecoration: !showTable ? "underline" : "none",
          }}
          onClick={() => setShowTable(false)}
        >
          Card
        </Button>
      </Box>
      <Box>
        {showTable ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Province</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right">{post.name}</TableCell>
                    <TableCell align="right">{post.description}</TableCell>
                    <TableCell align="right">{post.category.name}</TableCell>
                    <TableCell align="right">{post.province.name}</TableCell>
                    <TableCell align="right">{post.created_at}</TableCell>
                    <TableCell align="right">{post.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          favorites.map((favorite) => (
            <Card key={favorite.id} sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title={favorite.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {favorite.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {favorite.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can create a new post.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Navbar;
