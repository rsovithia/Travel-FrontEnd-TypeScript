import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../Auth/auth";
import config from "../../Api/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
}

interface Destination {
  description: string;
  id: number;
  name: string;
  image1: string;
  image2: string;
  image3: string;
  category: Category;
  province: Province;
  status: string;
}

interface Favorite {
  id: number;
  destination: Destination;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Province {
  id: number;
  name: string;
}

interface Post {
  id: number;
  name: string;
  description: string;
  status: string;
  category: Category;
  province: Province;
  created_at: string;
  image1: string;
}

const fileUrl = config.fileUrl;

const getPostsByUser = async (): Promise<{ data: Post[] }> => {
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

const getFavoritesByUser = async (): Promise<{ data: Favorite[] }> => {
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

const removePost = async (postId: number) => {
  try {
    const response = await fetch(
      `${config.apiUrl}/auth/delete-posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(`Post with ID ${postId} has been removed.`);
  } catch (error) {
    console.error("Error removing post:", error);
  }
};

const isFavorite = (item: Favorite | Post): item is Favorite => {
  return (item as Favorite).destination !== undefined;
};

const Navbar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteToRemove, setFavoriteToRemove] = useState<Favorite | null>(
    null
  );
  const [postToRemove, setPostToRemove] = useState<Post | null>(null);

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
    getPostsByUser().then((data) => setPosts(data.data || []));

    // Fetch favorites by user
    getFavoritesByUser().then((data) => setFavorites(data.data || []));
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

  const handleConfirmationDialogOpen = (favorite: Favorite) => {
    setFavoriteToRemove(favorite);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
    setFavoriteToRemove(null);
  };

  const handleRemoveFavorite = async () => {
    if (!favoriteToRemove) return;

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/my-favorites/${favoriteToRemove.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (favorite) => favorite.id !== favoriteToRemove.id
          )
        );
        handleConfirmationDialogClose();
      } else {
        console.error("Error removing favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handlePostConfirmationDialogOpen = (post: Post) => {
    setPostToRemove(post);
    setConfirmationDialogOpen(true);
  };

  const handlePostConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
    setPostToRemove(null);
  };

  const handleRemovePost = async () => {
    if (!postToRemove) return;

    await removePost(postToRemove.id);
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postToRemove.id)
    );
    handlePostConfirmationDialogClose();
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
          Favorites
        </Button>
        <Button
          sx={{
            textDecoration: !showTable ? "underline" : "none",
          }}
          onClick={() => setShowTable(false)}
        >
          Post
        </Button>
      </Box>
      <Grid container spacing={2}>
        {(showTable ? favorites : posts).map((item) => {
          if (isFavorite(item)) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxWidth: 320,

                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.destination?.name || "Unnamed"}
                      </Typography>
                      <IconButton
                        aria-label="remove favorite"
                        sx={{
                          alignItems: "center",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "1px",
                        }}
                        onClick={() => handleConfirmationDialogOpen(item)}
                      >
                        <FavoriteIcon
                          sx={{
                            bottom: "2px",
                            color: "#f44336",
                            display: "flex",
                            position: "relative",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      fileUrl + item.destination?.image1 ||
                      "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    }
                    alt={item.destination?.name || "Unnamed"}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Description: {item.destination?.description || "N/A"}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/destination/${item.destination?.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxWidth: 320,
                    marginBottom: 2,
                    position: "relative",
                  }}
                >
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.name}
                    </Typography>
                    <IconButton
                      aria-label="remove post"
                      sx={{
                        position: "absolute",
                        top: "1rem",
                        right: "0.5rem",
                      }}
                      onClick={() => handlePostConfirmationDialogOpen(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      fileUrl + item.image1 ||
                      "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    }
                    alt={item.name}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Description: {item.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Category: {item.category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Province: {item.province.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Status: {item.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/destination/${item.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can create a new post.</DialogContentText>
          {/* Form for creating a new post can be added here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>
          Remove {favoriteToRemove ? "Favorite" : "Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove (
            <span style={{ color: "Black" }}>
              {favoriteToRemove
                ? favoriteToRemove.destination?.name || "Unnamed"
                : postToRemove?.name || "Unnamed"}
            </span>
            ) from your {favoriteToRemove ? "favorites" : "posts"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={favoriteToRemove ? handleRemoveFavorite : handleRemovePost}
            color="primary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Navbar;
