import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import config from "../../Api/config";
import Footer from "../../Components/Footer/Footer";

interface Province {
  id: number;
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

interface Destination {
  id: number;
  name: string;
  image1: string;
  description: string;
  status: string;
  category: Category;
  province: Province;
  view_count: number;
}

interface ApiResponse {
  status: string;
  data: Destination[];
}

interface FavoriteResponse {
  status: string;
  data: Favorite[];
}

interface Favorite {
  id: number;
  destination_id: number;
}

const fileUrl = config.fileUrl;

const Destinations: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const [selectedProvince, setSelectedProvince] = useState<string | number>("");

  const getData = async (searchParams = {}) => {
    try {
      const query = new URLSearchParams({
        name: searchTerm,
        category: selectedCategory.toString(),
        province: selectedProvince.toString(),
        ...searchParams,
      }).toString();
      console.log("Fetching data with params:", query);
      const response = await fetch(`${config.apiUrl}/recommend-to-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result: ApiResponse = await response.json();
      console.log("Data fetched:", result);
      const filteredData = result.data.filter(
        (item) => item.status === "approved"
      );
      setDestinations(filteredData);
      console.log("Filtered destinations:", filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategory = async (searchParams = {}) => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      console.log("Fetching categories with params:", query);
      const response = await fetch(`${config.apiUrl}/auth/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      console.log("Categories fetched:", result);
      const formattedCategories = result.data.map((item: Category) => ({
        id: item.id,
        name: item.name,
      }));
      setCategories(formattedCategories);
      console.log("Formatted categories:", formattedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFavorites = async (searchParams = {}) => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      console.log("Fetching favorites with params:", query);
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result: FavoriteResponse = await response.json();
      console.log("Favorites fetched:", result);
      const favoriteIds = result.data.map((item) => item.destination_id);
      setFavorites(favoriteIds);
      console.log("Favorite IDs:", favoriteIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    getData();
    getCategory();
    getFavorites();
  }, [selectedCategory, selectedProvince]);

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
              width: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: "55%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <Typography fontWeight={600} variant="h4">
                Recommendation
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "0",
                borderRadius: "25px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "600px",
              }}
            ></Box>
          </Box>
        </Card>
      </Box>
      <Container sx={{ marginTop: "40px", marginBottom: "40px" }} maxWidth="xl">
        <Grid container spacing={3}>
          {destinations.map((destination) => (
            <Grid item xs={12} sm={6} md={6} key={destination.id}>
              <Link
                to={`/destination/${destination.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  elevation={2}
                  sx={{
                    display: "flex",
                    padding: "0 30px 0px 0px",
                    borderRadius: "14px",
                    position: "relative",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    sx={{
                      minHeight: 200,
                      width: 240,
                      borderRadius: "14px 0 0 0",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    image={
                      destination.image1
                        ? `${fileUrl}${destination.image1}`
                        : "https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM="
                    }
                    alt={destination.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "0 0 0 20px",
                    }}
                  >
                    <Typography
                      sx={{ padding: "10px 0 0px 0" }}
                      variant="h5"
                      gutterBottom
                    >
                      {destination.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography fontWeight={600} variant="body2">
                        Category:{" "}
                      </Typography>
                      <Typography variant="body2">
                        {destination.category.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography fontWeight={600} variant="body2">
                        Province:{" "}
                      </Typography>
                      <Typography variant="body2">
                        {destination.province.name}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", gap: "10px", paddingTop: "10px" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {destination.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">
                        {" "}
                        {destination.view_count} Views
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  >
                    {favorites.includes(destination.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Destinations;
