import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router

const provinces = [
  {
    name: "Phnom Penh",
    description: "The capital city of Cambodia. And have alot place ",
    image: "phnom-penh.jpg",
  },
  {
    name: "Siem Reap",
    description: "Famous for the Angkor Wat temple complex.",
    image: "siem-reap.jpg",
  },
  {
    name: "Sihanoukville",
    description: "Known for its beaches and nightlife.",
    image: "sihanoukville.jpg",
  },
  {
    name: "Sihanoukville",
    description: "Known for its beaches and nightlife.",
    image:
      "https://img.freepik.com/free-vector/cambodia-cultural-travel-map-flat-poster_1284-17113.jpg",
  },
  // Add more provinces as needed
];

const Destinations = () => {
  // Find the maximum height of the card content

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          sx={{ paddingTop: "120px" }}
          variant="h2"
          align="center"
          gutterBottom
        >
          Destinations in Cambodia
        </Typography>
        <Grid container spacing={3}>
          {provinces.map((province, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={2}>
                <CardMedia
                  component="img"
                  sx={{ height: 200 }} // Maintain 16:9 aspect ratio
                  image={province.image} // Use province image
                  alt={province.name}
                />
                <CardContent
                  sx={{
                    overflow: "auto",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {province.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {province.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link} // Use Link component from React Router
                    to={`/DestinationDetails`} // Navigate to /DestinationDetails
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Destinations;
