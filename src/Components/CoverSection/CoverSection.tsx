import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import background_CoverPages from "../../assets/CoverPages/background_CoverPages.svg";
import { EffectCoverflow, Pagination } from "swiper/modules";
import config from "../../Api/config";

const fileUrl = config.fileUrl;

interface Province {
  ranking: string;
  name: string;
  description: string;
  image2: string;
}

const CoverSection: React.FC = () => {
  const [topRatedProvinces, setTopRatedProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  useEffect(() => {
    const getDataTopRating = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/destination/topRating`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });
        const result = await response.json();
        console.log("API response:", result); // Log the API response

        if (result.status === "success") {
          const provinces: Province[] = result.data.map(
            (item: any, index: number) => ({
              ranking: `#${index + 1}`,
              name: item.destination.name,
              description: item.destination.description,
              image1: `${config.apiUrl}/${item.destination.image1}`, // Accessing the correct image1 field
            })
          );
          setTopRatedProvinces(provinces);
          setSelectedProvince(provinces[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDataTopRating();
  }, []);

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
            {selectedProvince && (
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
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{
                width: "400px",
                marginTop: "140px",
                padding: "10px 150px",
              }}
              onSlideChange={(swiper) =>
                setSelectedProvince(topRatedProvinces[swiper.activeIndex])
              }
            >
              {topRatedProvinces.map((province, index) => (
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
                        src={fileUrl + province.image2}  
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
