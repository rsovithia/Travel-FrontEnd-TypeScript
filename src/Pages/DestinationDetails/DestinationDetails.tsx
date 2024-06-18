import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Rating,
  IconButton,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import config from "../../Api/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import useAuth from "../../hooks/useAuth";
import LoginDialog from "../../Components/LoginDialog";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface Destination {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  lat: string;
  long: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

interface LikedGood {
  id: number;
  name: string;
  image: string;
}

const fileUrl = config.fileUrl;

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authenticated } = useAuth();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [alreadyRated, setAlreadyRated] = useState<boolean>(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<string>("");
  const [likedGoods, setLikedGoods] = useState<LikedGood[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/destination/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });
        const result = await response.json();
        console.log("Destination data:", result); // Log API response
        setDestination(result.data);
        setLoading(false);
        if (authenticated) {
          checkRating(result.data.id);
          getCheckTheFavorit(result.data.id);
          fetchLikedGoods();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, [id, authenticated]);

  const getCheckTheFavorit = async (destinationId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      console.log("Check favorite response:", result); // Log API response
      const favorite = result.data.find(
        (fav: { destination_id: number }) =>
          fav.destination_id === destinationId
      );
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    if (isFavorite) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
    await getCheckTheFavorit(parseInt(id)); // Check the favorites status after every click
  };

  const addFavorite = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({ destination_id: id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Add favorite response:", result); // Log API response
        if (result.data && result.data.id) {
          setIsFavorite(true);
          setFavoriteId(result.data.id);
        } else {
          console.error("Unexpected response structure:", result);
        }
      } else {
        console.error("Error adding favorite: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  const removeFavorite = async () => {
    if (favoriteId === null) {
      console.error("Favorite ID is null");
      return;
    }

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/my-favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Remove favorite response:", result); // Log API response
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        console.error("Error removing favorite");
      }
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const checkRating = async (destinationId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/destination/topRating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      console.log("Check rating response:", result); // Log API response
      const destinationRating = result.data.find(
        (rating: { destination_id: number }) =>
          rating.destination_id === destinationId
      );
      if (destinationRating) {
        setRating(parseFloat(destinationRating.average_rating));
        setAlreadyRated(true);
      }
    } catch (error) {
      console.error("Error fetching rating status:", error);
    }
  };

  const handleRatingChange = async (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    if (newValue !== null) {
      try {
        const response = await fetch(
          `${config.apiUrl}/auth/destination/${id}/rating`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.accessToken}`,
            },
            body: JSON.stringify({ rating: newValue }),
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log("Update rating response:", result); // Log API response
          setRating(newValue);
          setAlreadyRated(true);
        } else {
          console.error("Error updating rating");
        }
      } catch (error) {
        console.error("Error updating rating", error);
      }
    }
  };

  const openGoogleMaps = () => {
    if (destination) {
      window.open(
        `https://www.google.com/maps?q=${destination.lat},${destination.long}`,
        "_blank"
      );
    }
  };

  const fetchLikedGoods = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/${id}/liked-goods`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      console.log("Liked goods response:", result); // Log API response
      setLikedGoods(result.data);
    } catch (error) {
      console.error("Error fetching liked goods:", error);
    }
  };

  useEffect(() => {
    if (destination) {
      const timeoutId = setTimeout(() => {
        const map = new window.google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: {
              lat: parseFloat(destination.lat),
              lng: parseFloat(destination.long),
            },
            zoom: 8,
          }
        );

        new window.google.maps.Marker({
          position: {
            lat: parseFloat(destination.lat),
            lng: parseFloat(destination.long),
          },
          map,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [destination]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!destination) {
    return (
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Typography variant="h5">Destination not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ marginTop: "60px" }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid sx={{ marginTop: "80px" }} item xs={12} md={8}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                src={fileUrl + destination.image1}
                alt={destination.name}
              />
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{ padding: "0", margin: "0" }}
                    variant="h2"
                    gutterBottom
                  >
                    {destination.name}
                  </Typography>
                  <Box>
                    <IconButton onClick={handleFavoriteClick}>
                      <ThumbUpIcon sx={{ fontSize: "28px" }} />
                    </IconButton>
                    <IconButton onClick={handleFavoriteClick}>
                      <FavoriteIcon
                        sx={{ fontSize: "28px" }}
                        color={isFavorite ? "error" : "disabled"}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ padding: "0", margin: "0" }}
                    variant="body1"
                  >
                    By
                  </Typography>
                  <Avatar
                    alt={destination.user.name}
                    src={fileUrl + destination.user.avatar}
                    sx={{ margin: 1, width: 30, height: 30 }}
                  />
                  <Typography variant="body1">
                    {destination.user.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {!alreadyRated ? (
                      <Rating
                        size="large"
                        name="destination-rating"
                        value={rating}
                        onChange={handleRatingChange}
                      />
                    ) : (
                      <Typography>Rated</Typography>
                    )}
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={2} // optional, if you want to add some spacing on top
                  >
                    <FacebookShareButton
                      url={window.location.href}
                      style={{ marginRight: 8 }}
                    >
                      <FacebookIcon size={38} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={window.location.href}
                      title={`Check out this destination: ${destination.id}`}
                      style={{ marginRight: 8 }}
                    >
                      <TwitterIcon size={38} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={window.location.href}
                      title={`Check out this destination: ${destination.id}`}
                      summary={destination.description}
                    >
                      <LinkedinIcon size={38} round />
                    </LinkedinShareButton>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" mt={2}></Box>
                <Typography variant="body1" paragraph>
                  {destination.description}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  <Grid item xs={6}>
                    <img
                      src={fileUrl + destination.image2}
                      alt={`${destination.name} additional`}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      src={fileUrl + destination.image3}
                      alt={`${destination.name} additional`}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ marginTop: "80px" }} item xs={12} md={4}>
            <Typography variant="h6">Google Maps</Typography>
            <Box id="map" style={{ width: "100%", height: "400px" }}></Box>
            <Button
              variant="contained"
              color="primary"
              onClick={openGoogleMaps}
            >
              Open in Google Maps
            </Button>
            <Box mt={2}>
              <Typography variant="h6">User Comments</Typography>
              <TextField
                label="Add a comment"
                multiline
                fullWidth
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Goods Liked by User</Typography>
              <Grid container spacing={2}>
                {likedGoods.map((good) => (
                  <Grid item xs={12} sm={6} md={4} key={good.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={fileUrl + good.image}
                        alt={good.name}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {good.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
        />
      </Container>
    </>
  );
};

export default DestinationDetails;
