import { Box, Typography, Grid, Container } from "@mui/material";

export default function DetailHomePages() {
  return (
    <Container maxWidth={"xl"} sx={{ bgcolor: "#" }}>
      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom align="center">
              SmartVoyageRecommendation
            </Typography>
            <Typography>
              is your ultimate travel planning companion, dedicated to making
              your travel experiences in Cambodia seamless, enjoyable, and
              unforgettable. Our platform addresses the common challenges
              travelers face and aims to transform how you plan your
              itineraries.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: 2,
            }}
          >
            <img
              style={{ width: "400px", height: "400px", marginTop: 50 }}
              src="https://www.shutterstock.com/image-vector/cambodia-map-landmarks-people-traditional-600nw-567812944.jpg"
              alt="Placeholder 1"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: 2,
            }}
          >
            <img
              style={{ width: "600px", height: "400px", marginTop: 50 }}
              src="https://cambodiatravel.com/images/2020/12/intro-cambodia-general-information.jpg.webp"
              alt="Placeholder 1"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ marginTop:" 200px" }}>
            <Typography variant="h4" gutterBottom align="center">
              Personalized Recommendations
            </Typography>
            <Typography variant="body1">
              Using advanced algorithms, we offer personalized destination
              recommendations tailored to your preferences. By analyzing your
              past interactions and interests, we suggest the best destinations
              suited to your travel style.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
