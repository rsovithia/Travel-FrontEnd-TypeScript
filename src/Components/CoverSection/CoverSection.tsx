import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import allIcon from "../../assets/allprovie.svg";
import "./HeroSection.css";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        {" "}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              {/* Wrap CardActionArea with Link */}
              <Link to="/destinations" style={{ textDecoration: "none" }}>
                <Card sx={{ maxWidth: 300, bgcolor: "transparent" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={allIcon}
                      alt="Green Iguana"
                    />
                    <CardContent sx={{ bgcolor: "transparent" }}>
                      <Typography variant="body2" color="text.secondary">
                        All Province
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default HeroSection;
