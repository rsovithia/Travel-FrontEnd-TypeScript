import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const provinces = [
  {
    name: "Phnom Penh",
    description: "The capital city of Cambodia. And have a lot place ",
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
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Card elevation={2} sx={{ borderRadius: 0 }}>
          <CardMedia
            component="img"
            height="500"
            image="https://lp-cms-production.imgix.net/2019-06/474416112_super.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4" // Replace with your cover image URL
            alt="Cover Image"
            sx={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }} // Make image full width
          />
        </Card>
      </Box>
      <Container maxWidth="lg">
        <Typography
          sx={{ paddingTop: "20px" }}
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
                  sx={{ height: 0, paddingTop: '56.25%' }} // Maintain 16:9 aspect ratio
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
