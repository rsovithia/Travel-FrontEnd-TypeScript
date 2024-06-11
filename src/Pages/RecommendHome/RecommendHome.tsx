import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const Destinations = () => {
  const navigate = useNavigate();

  const handleAllDestinationsClick = () => {
    navigate("/destinations");
  };

  return (
    <Container
      sx={{
        padding: "40px",
        display: "flex",
        paddingBottom: "60px",
        marginVB: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 400, height: 400 }}>
          <CardMedia
            sx={{ height: 400 }}
            image="https://www.shutterstock.com/image-vector/cambodia-travel-attraction-label-landmarks-600nw-567804895.jpg"
            title="Cambodian Destination"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Cambodian Destination
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the captivating landscapes and vibrant culture of
              Cambodia.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
            <Button size="small">Share</Button>
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ marginLeft: "40px" }}>
          <Typography variant="h4" sx={{ textAlign: "left", padding: "18px" }}>
            All the Destinations in Cambodia
          </Typography>
          <Typography
            sx={{ width: "100%", textAlign: "left", padding: "18px" }}
          >
            Discover the diverse and beautiful destinations across Cambodia.
            From the bustling streets of Phnom Penh to the serene beaches of
            Sihanoukville, there's something for every traveler to enjoy.
          </Typography>
          <Button
            sx={{ marginTop: "20px", color: "#D38E1C" }}
            onClick={handleAllDestinationsClick}
          >
            <TravelExploreIcon sx={{ paddingRight: "10px" }} /> All Destinations
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Destinations;
