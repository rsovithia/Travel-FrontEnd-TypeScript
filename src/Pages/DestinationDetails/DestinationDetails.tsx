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
} from "@mui/material";
import config from "../../Api/config";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/auth/destination/${id}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Error updating favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      setLoading(false);
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
        } else {
          console.error("Error updating rating");
        }
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

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
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          src={fileUrl + destination.image1}
          alt={destination.name}
        />
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {destination.name}
            <IconButton onClick={handleFavoriteClick}>
              <FavoriteIcon color={isFavorite ? "secondary" : "default"} />
            </IconButton>
          </Typography>
          <Rating
            name="destination-rating"
            value={rating}
            onChange={handleRatingChange}
          />
          <Typography variant="body1" paragraph>
            {destination.description}
          </Typography>
          <Typography variant="h6">Coordinates:</Typography>
          <Typography variant="body2">
            Latitude: {destination.lat}, Longitude: {destination.long}
          </Typography>
          {/* Additional images */}
          <div style={{ display: "flex", marginTop: "20px" }}>
            <img
              src={fileUrl + destination.image2}
              alt={`${destination.name} additional`}
              style={{ width: "50%", marginRight: "10px" }}
            />
            <img
              src={fileUrl + destination.image3}
              alt={`${destination.name} additional`}
              style={{ width: "50%" }}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DestinationDetails;
