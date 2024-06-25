import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import config from "../../Api/config";
import { Link } from "react-router-dom";
interface Destination {
  id: number;
  image1: string;
  name: string;
  description: string;
}

interface Recommendation {
  destination_id: number;
  destination: Destination;
  total_view: number;
}

const fetchtopview = async (): Promise<Recommendation[]> => {
  try {
    const response = await fetch(`${config.apiUrl}/destination/top-view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the API response to the console
    return data.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching top views:", error);
    return [];
  }
};

export default function Home() {
  const [recommendationsData, setRecommendationsData] = useState<
    Recommendation[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchtopview();
      setRecommendationsData(data); // Update the state with fetched data
    };

    fetchData(); // Call the function when the component mounts
  }, []);

  const fileUrl = config.fileUrl;

  return (
    <>
      <Box sx={{ bgcolor: "black" }}>
        <Box
          sx={{
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600" }}
            gutterBottom
            variant="h3"
            color={"white"}
            component="div"
          >
            The Most Viewed Destinations
          </Typography>
          <Typography gutterBottom variant="h6" color={"white"}>
            The destinations with the highest number of views on the website,
            attracting a significant amount of interest from visitors.
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Grid container spacing={6} justifyContent="center">
            {recommendationsData.map((recommendation) => {
              if (!recommendation || !recommendation.destination) return null;

              const { id, image1, name } = recommendation.destination;

              return (
                <Grid item key={id}>
                  <Card
                    sx={{
                      maxWidth: "300px",
                      backgroundColor: "transparent",
                      padding: "10px",
                    }}
                  >
                    <CardActionArea>
                      <Link
                        to={`/destination/${id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {image1 && (
                          <CardMedia
                            sx={{ width: "100%" }}
                            component="img"
                            height="200"
                            image={`${fileUrl}${image1}`}
                            alt={`Recommendation ${id}`}
                          />
                        )}
                        <CardContent sx={{ backgroundColor: "transparent" }}>
                          <Typography
                            sx={{ color: "white" }}
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {name}
                          </Typography>
                        </CardContent>
                      </Link>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
