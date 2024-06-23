import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
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
      const response = await fetch(`${config.apiUrl}/destination?${query}`, {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  const handleSearch = () => {
    console.log("Search button clicked. Term:", searchTerm);
    getData({ name: searchTerm });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedCategory(event.target.value as string | number);
    console.log("Selected category:", event.target.value);
  };

  const handleProvinceChange = (event: SelectChangeEvent<string | number>) => {
    setSelectedProvince(event.target.value as string | number);
    console.log("Selected province:", event.target.value);
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
                Search Destination
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
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <TextField
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search Destination"
                  variant="outlined"
                  sx={{
                    borderRadius: "25px 0 0 25px",
                    flexGrow: 1,
                    border: "none",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px 0 0 25px",
                      border: "none",
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: "0 25px 25px 0",
                    padding: "14px 24px",
                    backgroundColor: "#D7A759",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#B08A5C", // Change this to your desired hover color
                    },
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "10px",
                gap: "20px",
                width: "64%",
                borderRadius: "25px",
                display: "flex",
              }}
            >
              <FormControl
                fullWidth
                sx={{
                  borderRadius: "25px",
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <InputLabel id="category1-select-label">Province</InputLabel>
                <Select
                  sx={{
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  labelId="category1-select-label"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Banteay Meanchey</MenuItem>
                  <MenuItem value="2">Kampong Cham</MenuItem>
                  <MenuItem value="3">Tboung Khmum</MenuItem>
                  <MenuItem value="4">Battambang</MenuItem>
                  <MenuItem value="5">Kampong Chhnang</MenuItem>
                  <MenuItem value="6">Kampong Speu</MenuItem>
                  <MenuItem value="7">Kampong Thom</MenuItem>
                  <MenuItem value="8">Kampot</MenuItem>
                  <MenuItem value="9">Kandal</MenuItem>
                  <MenuItem value="10">Koh Kong</MenuItem>
                  <MenuItem value="11">Kratié</MenuItem>
                  <MenuItem value="12">Mondulkiri</MenuItem>
                  <MenuItem value="13">Phnom Penh</MenuItem>
                  <MenuItem value="14">Preah Vihear</MenuItem>
                  <MenuItem value="15">Prey Veng</MenuItem>
                  <MenuItem value="16">Pursat</MenuItem>
                  <MenuItem value="17">Ratanakiri</MenuItem>
                  <MenuItem value="18">Siem Reap</MenuItem>
                  <MenuItem value="19">Preah Sihanouk</MenuItem>
                  <MenuItem value="20">Stung Treng</MenuItem>
                  <MenuItem value="21">Svay Rieng</MenuItem>
                  <MenuItem value="22">Takéo</MenuItem>
                  <MenuItem value="23">Oddar Meanchey</MenuItem>
                  <MenuItem value="24">Kep</MenuItem>
                  <MenuItem value="25">Pailin</MenuItem>
                  <MenuItem value="26">Tboung Khmum</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{
                  borderRadius: "25px",
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <InputLabel id="category2-select-label">Category</InputLabel>
                <Select
                  sx={{
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  labelId="category2-select-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
                        Province:{" "}
                      </Typography>
                      <Typography variant="body2">
                        {destination.province.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography fontWeight={600} variant="body2">
                        Category:{" "}
                      </Typography>
                      <Typography variant="body2">
                        {destination.category.name}
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
