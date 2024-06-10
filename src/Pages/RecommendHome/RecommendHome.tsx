 
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
 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Destinations = () => {
  return (
    <Container sx={{ padding: "40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">All the Destinations in Cambodia</Typography>
        <Typography sx={{ width: "80%" }}>
          Discover the diverse and beautiful destinations across Cambodia. From
          the bustling streets of Phnom Penh to the serene beaches of
          Sihanoukville, there's something for every traveler to enjoy.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 300, height: 300 }}>
          <CardMedia
            sx={{ height: 400 }}
            image="https://lp-cms-production.imgix.net/2019-06/474416112_super.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4"
            title="Cambodian Destination"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
    </Container>
  );
};

export default Destinations;
