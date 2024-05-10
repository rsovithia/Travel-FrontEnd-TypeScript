import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
// import CoverSection from "../../components/CoverSection/CoverSection";
// import DestinationDetail from "../DestinationDetails/DestinationDetails";


const provinces = [
  {
    name: "Phnom Penh",
    description: "The capital city of Cambodia.",
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
    image: "sihanoukville.jpg",
  },
  // Add more provinces as needed
];


const Destinations = () => {
  return (
    <>
      {/* <CoverSection /> */}
      <Container maxWidth="lg">
        <Typography
          sx={{ padding: "20px" }}
          variant="h2"
          align="center"
          gutterBottom
        >
          Destinations in Cambodia
        </Typography>
        <Grid container spacing={3}>
          {provinces.map((province, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {" "}
              {/* Adjusted md to display 4 cards per line */}
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/images/${province.image}`} // Assuming images are in a folder named "images"
                  alt={province.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {province.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {province.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`#${province.name.replace(/\s+/g, "-")}`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Additional sections for each province */}
      </Container>
    </>
  );
};

export default Destinations;
