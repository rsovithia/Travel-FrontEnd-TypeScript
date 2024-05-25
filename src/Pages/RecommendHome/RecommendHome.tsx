import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  {
    name: "Battambang",
    description:
      "Known for its colonial architecture and nearby ancient temples.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Battambang_central_market.jpg/800px-Battambang_central_market.jpg",
  },
  // Add more provinces as needed
];

const Destinations = () => {
  const [isLongPress, setIsLongPress] = useState(false);
  let timer: number | undefined;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <div
        style={{
          right: "10px",
          zIndex: 1,
          fontSize: "30px",
          cursor: "pointer",
        }}
      >
        →
      </div>
    ),
    prevArrow: (
      <div
        style={{ left: "10px", zIndex: 1, fontSize: "30px", cursor: "pointer" }}
      >
        ←
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleMouseDown = () => {
    timer = setTimeout(() => {
      setIsLongPress(true);
    }, 500); // Adjust the duration as needed
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
    if (!isLongPress) {
      // This means it was a click, not a long press
      setIsLongPress(false);
    }
  };

  const handleClick = (e: { preventDefault: () => void }) => {
    if (isLongPress) {
      e.preventDefault(); // Prevent the default action if it's a long press
      setIsLongPress(false);
    }
  };

  return (
    <Container sx={{ padding: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h2" gutterBottom>
            Destinations in Cambodia
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            There will be a small title here.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Slider {...settings}>
            {provinces.map((province, index) => (
              <Box key={index} paddingRight={10}>
                <Card
                  elevation={4}
                  sx={{
                    position: "relative",
                    backgroundColor: "#000",
                    margin: "10px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 400,
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                    image={province.image}
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
                      textAlign: "left",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
                    }}
                  >
                    <Typography variant="h6" component="div" color="white">
                      {province.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {province.description}
                    </Typography>
                    <Link
                      to={`/province/${province.name}`}
                      style={{ textDecoration: "none" }}
                      onClick={handleClick}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: "10px" }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Box>
                </Card>
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Destinations;
