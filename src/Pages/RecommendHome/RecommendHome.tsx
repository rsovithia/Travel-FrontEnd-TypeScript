import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router

const provinces = [
  {
    name: "Phnom Penh",
    description: "The capital city of Cambodia. And have a lot of places.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Phnom_Penh_Independence_Monument.jpg/800px-Phnom_Penh_Independence_Monument.jpg",
  },
  {
    name: "Siem Reap",
    description: "Famous for the Angkor Wat temple complex.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/e0/siem-reap.jpg?w=1400&h=1400&s=1",
  },
  {
    name: "Sihanoukville",
    description: "Known for its beaches and nightlife.",
    image:
      "https://media.istockphoto.com/id/514263434/photo/quiet-empty-paradise-beach-in-koh-rong-near-sihanoukville-cambodia.jpg?s=612x612&w=0&k=20&c=H9n0e9ldKM7XyZqwJ4e7VfTwbOkUne8z2nSWGwEf-9A=",
  },
  {
    name: "Koh Rong",
    description:
      "An island known for its stunning beaches and vibrant nightlife, located near Sihanoukville.",
    image:
      "https://lp-cms-production.imgix.net/2019-06/474416112_super.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
  },
  // Add more provinces as needed
];

const Destinations = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          sx={{ paddingTop: "20px", color: "white" }}
          variant="h2"
          align="center"
          gutterBottom
        >
          Destinations in Cambodia
        </Typography>
        <Typography
          sx={{ paddingBottom: "20px", color: "white" }}
          variant="subtitle1"
          align="center"
          gutterBottom
        >
          There will be a small title here.
        </Typography>
        <Grid container spacing={3}>
          {provinces.map((province, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={2}
                sx={{ position: "relative", backgroundColor: "black" }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 300, objectFit: "cover" }} // Adjust to fill in the space
                  image={province.image} // Use province image
                  alt={province.name}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 100,
                    padding: "10px",
                    textAlign: "center",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)", // Gradient background for text
                  }}
                >
                  <Typography variant="h6" component="div" color="white">
                    {province.name}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {province.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Destinations;
