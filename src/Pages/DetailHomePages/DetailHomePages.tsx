import { Box, Typography, Grid } from "@mui/material";
 
 

export default function DetailHomePages() {
  return (
    <Box sx={{ bgcolor: "#" }}>
      
        <Grid container>
          <Grid item xs={6}>
            <Box sx={{ padding: 20 }}>
              <Typography variant="h3" gutterBottom align="center">
                About The Websites 2
              </Typography>
              <Typography variant="body1">
                This is some text content for Box1. You can put any text here
                that you like. This is some text content for Box1. You can put
                any text here that you like. This is some text content for Box1.
                You can put any text here that you like.
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
                style={{ width: "350px", height: "400px", marginTop: 50 }}
                src="https://via.placeholder.com/150"
                alt="Placeholder 1"
              />
              <img
                style={{ width: "350px", height: "400px" }}
                src="https://via.placeholder.com/150"
                alt="Placeholder 2"
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
                style={{ width: "350px", height: "400px" }}
                src="https://via.placeholder.com/150"
                alt="Placeholder 2"
              />
              <img
                style={{ width: "350px", height: "400px", marginTop: 50 }}
                src="https://via.placeholder.com/150"
                alt="Placeholder 1"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ padding: 20 }}>
              <Typography variant="h3" gutterBottom align="center">
                Smart Machine Learning
              </Typography>
              <Typography variant="body1">
                This is some text content for Box1. You can put any text here
                that you like. This is some text content for Box1. You can put
                any text here that you like. This is some text content for Box1.
                You can put any text here that you like.
              </Typography>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
}
