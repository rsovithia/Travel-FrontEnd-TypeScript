import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../Api/config";

interface Province {
  id: number;
  name: string;
  image: string;
}

interface ApiResponse {
  status: string;
  data: {
    id: number;
    name: string;
    image1: string;
    description: string;
  }[];
}

const fileUrl = config.fileUrl;

const Destinations: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/destination`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result: ApiResponse = await response.json();
      console.log("API Response Data:", result);
      const formattedProvinces = result.data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image1,
      }));
      setProvinces(formattedProvinces);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Card elevation={2} sx={{ borderRadius: 0 }}>
          <CardMedia
            component="img"
            height="400"
            image="https://lp-cms-production.imgix.net/2023-11/GettyImages-1469688108.jpg?auto=format&w=1440&h=810&fit=crop&q=75" // Replace with your cover image URL
            alt="Cover Image"
            sx={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }} // Make image full width
          />
          <Typography
            sx={{ padding: "20px" }}
            variant="h2"
            align="center"
            bgcolor={"#CB9027"}
            gutterBottom
          >
            Destinations in Cambodia
          </Typography>
        </Card>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {provinces.map((province, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link
                to={`/destination/${province.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card elevation={2} sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 300 }} // Maintain 16:9 aspect ratio
                    image={fileUrl + province.image} // Use province image
                    alt={province.name}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "90%",
                      height: "90%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      padding: "16px",
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {province.name}
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Destinations;
  