import { Box, Container, Typography, Grid } from "@mui/material";
import React from "react";

export default function DetailHomePages() {
  return (
    <Box sx={{ border: "1px solid black" }}>
      <Box>
        <Typography variant="h3" gutterBottom align="center">
          DetailHomePages
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="center">
          Tour gives you the opportunity to see a lot, within a time frame
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ padding: 20, border: "1px solid black" }}>
            <Typography variant="h3" gutterBottom align="center">
              Popular Destinations
            </Typography>
            <Typography variant="body1">
              This is some text content for Box1. You can put any text here that
              you like. This is some text content for Box1. You can put any text
              here that you like. This is some text content for Box1. You can
              put any text here that you like.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: 2,
              border: "1px solid black",
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
              border: "1px solid black",
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
          <Box sx={{ padding: 20, border: "1px solid black" }}>
            <Typography variant="h3" gutterBottom align="center">
              Popular Destinations
            </Typography>
            <Typography variant="body1">
              This is some text content for Box1. You can put any text here that
              you like. This is some text content for Box1. You can put any text
              here that you like. This is some text content for Box1. You can
              put any text here that you like.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
