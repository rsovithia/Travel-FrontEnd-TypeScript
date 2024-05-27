import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import background_CoverPages from "../../assets/CoverPages/background_CoverPages.svg";

import { EffectCoverflow, Pagination } from "swiper/modules";

const provinces = [
  {
    ranking: "#1",
    name: "Phnom Penh",
    description: "The capital city of Cambodia. And have a lot of places.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Phnom_Penh_Independence_Monument.jpg/800px-Phnom_Penh_Independence_Monument.jpg",
  },
  {
    ranking: "#2",
    name: "Siem Reap",
    description: "Famous for the Angkor Wat temple complex.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/e0/siem-reap.jpg?w=1400&h=1400&s=1",
  },
  {
    ranking: "#3",
    name: "Sihanoukville",
    description: "Known for its beaches and nightlife.",
    image:
      "https://media.istockphoto.com/id/514263434/photo/quiet-empty-paradise-beach-in-koh-rong-near-sihanoukville-cambodia.jpg?s=612x612&w=0&k=20&c=H9n0e9ldKM7XyZqwJ4e7VfTwbOkUne8z2nSWGwEf-9A=",
  },
  {
    ranking: "#4",
    name: "Koh Rong",
    description:
      "An island known for its stunning beaches and vibrant nightlife, located near Sihanoukville.",
    image:
      "https://lp-cms-production.imgix.net/2019-06/474416112_super.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
  },
  // Add more provinces as needed
];

const CoverSection: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `url(${background_CoverPages}) center center/cover no-repeat`,
        boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.2)",
        "::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "300px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ width: "90%" }}>
        <Grid item xs={2} md={2}></Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography
              marginBottom={0}
              color={"white"}
              variant="h2"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              Top 5 Destinations
            </Typography>

            <Typography
              marginBottom={10}
              color={"white"}
              variant="h2"
              gutterBottom
            >
              in Cambodia
            </Typography>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "15px",
                padding: "20px",
                height: "320px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                color: "white",
              }}
            >
              <Typography variant="h4" gutterBottom>
                {selectedProvince.ranking} {selectedProvince.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {selectedProvince.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 130,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{
                width: "400px",
                marginTop: "140px",
                padding: "10px 150px",
              }}
              onSlideChange={(swiper) =>
                setSelectedProvince(provinces[swiper.activeIndex])
              }
            >
              {provinces.map((province, index) => (
                <SwiperSlide key={index}>
                  <Link
                    to={`/province/${province.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        position: "relative",
               
                        borderRadius: "15px",
                        overflow: "hidden",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        
                      }}
                    >
                      <img
                        src={province.image}
                        alt={province.name}
                        style={{
                          height: 500,
                          objectFit: "cover",
                          borderRadius: "15px",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CoverSection;
