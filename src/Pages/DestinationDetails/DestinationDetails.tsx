import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import config from "../../Api/config";

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

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/${id}`, {
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
          image={`${config.apiUrl}/${destination.image1}`}
          alt={destination.name}
        />
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {destination.name}
          </Typography>
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
              src={`${config.apiUrl}/${destination.image2}`}
              alt={`${destination.name} additional`}
              style={{ width: "50%", marginRight: "10px" }}
            />
            <img
              src={`${config.apiUrl}/${destination.image3}`}
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
