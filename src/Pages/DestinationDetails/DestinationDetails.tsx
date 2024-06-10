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
} from "@mui/material";
import config from "../../Api/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMap from "../../Components/GoogleMaps/GoogleMaps"; // Import the GoogleMap component

interface Destination {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  lat: string;
  long: string;
}

const fileUrl = config.fileUrl;

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [alreadyRated, setAlreadyRated] = useState<boolean>(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/destination/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      setDestination(result.data);
      setLoading(false);
      checkFavorite(result.data.id);
      checkRating(result.data.id);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
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
        setIsFavorite(true);
        const result = await response.json();
        setFavoriteId(result.data.id); // Set the favorite ID
      } else {
        console.error("Error updating favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
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
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        console.error("Error removing favorite");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const checkFavorite = async (destinationId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      const favorites = result.data;
      const favorite = favorites.find(
        (favorite: { destination_id: number }) =>
          favorite.destination_id === destinationId
      );
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.id); // Set the favorite ID
      }
    } catch (error) {
      console.error("Error fetching favorite status:", error);
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
      const topRatings = result.data;
      const destinationRating = topRatings.find(
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
          setRating(newValue);
          setAlreadyRated(true);
        } else {
          console.error("Error updating rating");
        }
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!destination) {
    return (
      <Container maxWidth="md" style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5">Destination not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          src={fileUrl + destination.image1}
          alt={destination.name}
        />
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" gutterBottom>
              {destination.name}
            </Typography>
            <IconButton sx={{ bottom: "10px" }} onClick={handleFavoriteClick}>
              <FavoriteIcon color={isFavorite ? "secondary" : "default"} />
            </IconButton>
          </Box>
          {alreadyRated ? (
            <Typography>Rated</Typography>
          ) : (
            <Rating
              name="destination-rating"
              value={rating}
              onChange={handleRatingChange}
            />
          )}
          <Typography variant="body1" paragraph>
            {destination.description}
          </Typography>
          <Typography variant="h6">Coordinates:</Typography>
          <Typography variant="body2">
            Latitude:{" "}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.long}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {destination.lat}, Longitude: {destination.long}
            </a>
          </Typography>
          <GoogleMap lat={parseFloat(destination.lat)} lon={parseFloat(destination.long)} />
          {/* Additional images */}
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
    </Container>
  );
};

export default DestinationDetails;
