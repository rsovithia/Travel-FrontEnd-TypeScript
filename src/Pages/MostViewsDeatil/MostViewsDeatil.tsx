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

interface Destination {
  image1: string;
  name: string;
  description: string;
}

interface Recommendation {
  destination: Destination;
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
    console.error("Error fetching categories:", error);
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
      <Box
        sx={{
          bgcolor: "black",
        }}
      >
        <Box
          sx={{
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600" }}
            gutterBottom
            variant="h5"
            color={"white"}
            component="div"
          >
            Travel Recommendation
          </Typography>
          <Typography>
            Travel app is the website that helps you to get your destination in
            Cambodia
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Grid container spacing={6} justifyContent="center">
            {recommendationsData.map((recommendation, index) => {
              if (!recommendation || !recommendation.destination) return null;

              const { image1, name } = recommendation.destination;

              return (
                <Grid item key={index}>
                  <Card
                    sx={{ maxWidth: "300px", backgroundColor: "transparent" }}
                  >
                    <CardActionArea>
                      {image1 && (
                        <CardMedia
                          sx={{ width: "100%" }}
                          component="img"
                          height="200"
                          image={`${fileUrl}${image1}`}
                          alt={`Recommendation ${index}`}
                        />
                      )}
                      <CardContent sx={{ backgroundColor: "transparent" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {name}
                        </Typography>
                      </CardContent>
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
