import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import background_CoverPages from "../../assets/CoverPages/background_CoverPages.svg";
import { EffectCoverflow, Pagination } from "swiper/modules";
import config from "../../Api/config";

interface Province {
  id: string;
  ranking: number;
  name: string;
  description: string;
  image1: string;
  average_rating: number;
}

const CoverSection: React.FC = () => {
  const [topRatedProvinces, setTopRatedProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
   
  const fetchTopView = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/destination/topRating`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);

      const provinces = data.data.map((item: any) => ({
        id: item.destination.id,
        ranking: parseInt(item.average_rating),
        name: item.destination.name,
        description: item.destination.description,
        image1: item.destination.image1,
        average_rating: parseFloat(item.average_rating) / 2,
      }));

      return provinces;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const provinces = await fetchTopView();
      setTopRatedProvinces(provinces);
      if (provinces.length > 0) {
        setSelectedProvince(provinces[0]);
      }
    };

    fetchData();
  }, []);

  const fileUrl = config.fileUrl;

  const handleProvinceClick = (province: Province) => {
    console.log("Selected Province ID:", province.id);
  };

 

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
        "::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ width: "90%", textAlign: "center" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography
              marginBottom={0}
              color={"white"}
              variant="h2"
              gutterBottom
              display="flex"
              alignItems="center"
              justifyContent="left"
            >
              Top 5 Destinations
            </Typography>
            <Typography
              marginBottom={0}
              color={"white"}
              variant="h2"
              gutterBottom
              display="flex"
              alignItems="center"
              justifyContent="left"
            >
              in Cambodia
            </Typography>
            <Box
              sx={{
                bgcolor: "white",
                padding: "1px",
                width: "50%",
                marginBottom: 10,
              }}
            />

            {selectedProvince && (
              <Box
                sx={{
                  borderRadius: "15px",
                  padding: "40px",
                  width: "400px",
                  height: "250px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(5px)",
                  color: "white",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {selectedProvince.name}
                </Typography>
                <Rating
                  name="average-rating"
                  value={selectedProvince.average_rating}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  color={"white"}
                  variant="h6"
                  gutterBottom
                  display="flex"
                  alignItems="start"
                  justifyContent="left"
                >
                  {selectedProvince.description}
                </Typography>
              </Box>
            )}
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
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
              }}
              onSlideChange={(swiper) =>
                setSelectedProvince(topRatedProvinces[swiper.activeIndex])
              }
            >
              {topRatedProvinces.map((province, index) => (
                <SwiperSlide key={index}>
                  <Box
                    onClick={() => handleProvinceClick(province)}
                    sx={{
                      position: "relative",
                      borderRadius: "15px",
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Link
                      to={`/destination/${province.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={fileUrl + province.image1}
                        alt={province.name}
                        style={{
                          height: 600,
                          objectFit: "cover",
                          borderRadius: "15px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </Link>
                  </Box>
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
