import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import CoverSection from "../../Components/CoverSection/CoverSection";
import icon from "../../assets/Vector.svg";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  return (
    <>
      <CoverSection />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            paddingRight: "20px", // Add some space between the image and text
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                width="500"
                image={icon}
                alt="   "
              />
            </CardActionArea>
          </Card>
        </Box>
        <Box
          sx={{
            maxWidth: "50%",
            paddingLeft: "20px", // Add some space between the image and text
          }}
        >
          <Box sx={{ padding: "0px" }}>
            <Typography
              sx={{ fontWeight: "600" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Travel Website
            </Typography>
            <Typography paragraph>
              Travel app is the website that helps you find your destination in
              Cambodia. Whether you're looking for historical sites, natural
              wonders, or cultural experiences, our platform provides
              comprehensive information to make your trip memorable.
            </Typography>
            <Typography>
              Explore Cambodia's diverse provinces, from the bustling streets of
              Phnom Penh to the serene landscapes of Siem Reap. Our platform
              showcases the beauty and richness of each region, allowing you to
              plan your itinerary with ease.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#EDA821", padding: "20px", marginTop: "40px" }}>
        <Box
          sx={{
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            News Update
          </Typography>
          <Typography>
            Travel app is the website that helps you to get your destination in
            Cambodia{" "}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Grid container spacing={2} justifyContent="center">
            {[1, 2, 3, 4, 5].map((index) => (
              <Grid item key={index}>
                <Card sx={{ maxWidth: "300px" }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ width: "100%" }}
                      component="img"
                      height="200"
                      image={`/static/images/cards/contemplative-reptile-${index}.jpg`}
                      alt={`green iguana ${index}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/contemplative-reptile.jpg"
                  alt="Green Iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
