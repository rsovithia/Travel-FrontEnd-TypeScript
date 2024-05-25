import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import allIcon from "../../assets/allprovie.svg";
import "./HeroSection.css";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Card, CardContent, Typography } from "@mui/material";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Card>
          <img
            src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
            srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
            loading="lazy"
            alt="Yosemite National Park"
          />
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
