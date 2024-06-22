import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../Api/config";
import Footer from "../../Components/Footer/Footer";

interface Destination {
  id: number;
  name: string;
  image1: string;
}

interface ApiResponse {
  status: string;
  data: Destination[];
}

const fileUrl = config.fileUrl;

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      console.log("Fetching destinations from API...");
      const response = await fetch(`${config.apiUrl}/auth/recommend-to-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        console.log("API response data:", data);
        setDestinations(data.data);
      } else {
        console.error("Failed to fetch destinations:", response.status);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Card elevation={2} sx={{ borderRadius: 0 }}>
          <CardMedia
            component="img"
            height="500"
            image="https://lp-cms-production.imgix.net/2023-11/GettyImages-1469688108.jpg?auto=format&w=1440&h=810&fit=crop&q=75"
            alt="Cover Image"
            sx={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              left: "50%",
              height: "70%",
              width: "80%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ marginTop: "40px" }}>
              <Typography fontWeight={600} variant="h4" align="center">
                Recommendation
              </Typography>
              <Typography fontWeight={600} variant="h6" align="center">
                Do you want the Smart Voyage Recommendation to generate the best
                place to travel for you?
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "80%",
                left: "50%",
                height: "55%",
                transform: "translate(-50%, -50%)",

                borderRadius: "8px",
              }}
            >
              <Button onClick={fetchDestinations}>Generate</Button>
            </Box>
          </Box>
        </Card>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ marginTop: "40px", marginBottom: "40px" }} maxWidth="xl">
          <Grid container spacing={3}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={destination.id}>
                <Link
                  to={`/destination/${destination.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    elevation={4}
                    sx={{
                      borderRadius: "14px",
                      transition: "transform 0.3s ease",
                      animation: 'fadeIn 0.5s ease-in-out',
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      width={100}
                      image={`${fileUrl}${destination.image1}`}
                      sx={{
                        borderRadius: "14px 14px 0 0",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    <Box sx={{ padding: "16px" }}>
                      <Typography
                        sx={{ padding: "10px 0 0px 0" }}
                        variant="h5"
                        gutterBottom
                      >
                        {destination.name}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <Footer />
    </>
  );
};


export default Destinations;
