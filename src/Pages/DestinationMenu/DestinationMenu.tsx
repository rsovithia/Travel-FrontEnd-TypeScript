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
import config from "../../Api/config";

interface Province {
  id: number;
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
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
  const [categories, setCategories] = useState<Category[]>([]);
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
      const formattedProvinces = result.data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image1,
      }));
      setProvinces(formattedProvinces);
      console.log("Formatted provinces:", formattedProvinces);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategory = async (searchParams = {}) => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      console.log("Fetching categories with params:", query);
      const response = await fetch(`${config.apiUrl}/auth/category?${query}`, {
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

  useEffect(() => {
    getData();
    getCategory();
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
      <Box sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
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
              <Typography>ALL Destination</Typography>
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
                  placeholder="Restaurant or destination"
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
                  placeholder="hello"
                  labelId="category1-select-label"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
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
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {provinces.map((province) => (
            <Grid item xs={12} sm={6} md={3} mt={4} key={province.id}>
              <Link
                to={`/destination/${province.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card elevation={2} sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    sx={{ height: 300 }} // Maintain 16:9 aspect ratio
                    image={fileUrl + province.image} // Use province image
                    alt={province.name}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      textAlign: "center",
                      alignItems: "center",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      padding: "16px 0",
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
