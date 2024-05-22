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
      <div className="hero-btns"></div>
    </div>
  );
};

export default HeroSection;
