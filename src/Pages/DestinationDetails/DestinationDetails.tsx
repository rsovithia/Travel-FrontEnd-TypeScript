import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Rating,
  IconButton,
  Grid,
  Box,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardMedia,
} from "@mui/material";
import config from "../../Api/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import useAuth from "../../hooks/useAuth";
import LoginDialog from "../../Components/LoginDialog";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

interface Destination {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  lat: string;
  long: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  ratings: {
    id: number;
    destination_id: number;
    user_id: number;
    rating: number;
    comments: string;
    user: {
      id: number;
      name: string;
      avatar: string;
    };
  }[];
  related: {
    id: number;
    name: string;
    image1: string;
    description: string;
  }[];
}
interface CommentUser {
  id: number;
  name: string;
  avatar?: string; // Make avatar optional
}

interface SubmittedComment {
  rating: number;
  comments: string;
  user: CommentUser;
}

interface LikedGood {
  id: number;
  name: string;
  image: string;
}

interface AuthContextType {
  authenticated: boolean;
  user: {
    id: number;
    name: string;
  } | null;
}

const fileUrl = config.fileUrl;

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authenticated, user } = useAuth() as AuthContextType;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [alreadyRated, setAlreadyRated] = useState<boolean>(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<string>("");
  const [likedGoods, setLikedGoods] = useState<LikedGood[]>([]);
  const [, setIsLiked] = useState<boolean>(false);
  const [openRatingDialog, setOpenRatingDialog] = useState<boolean>(false);
  const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
  const [tempRating, setTempRating] = useState<number | null>(null);
  const [tempComments, setTempComments] = useState<string>("");
  const [submittedComments, setSubmittedComments] = useState<
    SubmittedComment[]
  >([]);
  const [thumbsSwiper] = useState(null);

  const email = "Vithiasokh22@gmail.com"; // Fixed email for local storage check

  useEffect(() => {
    const getData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${config.apiUrl}/destination/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });
        const result = await response.json();
        console.log("Destination data:", result); // Log API response
        setDestination(result.data);
        setLoading(false);

        // Set rating from API response
        const ratings = result.data.ratings;
        if (ratings && ratings.length > 0) {
          const userRating = ratings.find(
            (r: { user_id: number }) => user && r.user_id === user.id
          );
          if (userRating) {
            setRating(userRating.rating);
            setAlreadyRated(true);
          } else {
            const averageRating =
              ratings.reduce(
                (acc: number, r: { rating: number }) => acc + r.rating,
                0
              ) / ratings.length;
            setRating(averageRating);
          }
        }

        // Check local storage for the rating status
        const hasRated = localStorage.getItem(`rated_${email}_${id}`);
        if (hasRated) {
          setAlreadyRated(true);
        }

        if (authenticated) {
          getCheckTheFavorit(result.data.id);
          fetchLikedGoods();
        }

        // Set comments from API response
        const submittedComments = result.data.ratings.map((r: any) => ({
          rating: r.rating,
          comments: r.comments,
          user: r.user,
        }));
        setSubmittedComments(submittedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, [id, authenticated, user]);

  const getCheckTheFavorit = async (destinationId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      const result = await response.json();
      console.log("Check favorite response:", result); // Log API response
      const favorite = result.data.find(
        (fav: { destination_id: number }) =>
          fav.destination_id === destinationId
      );
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    if (isFavorite) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
    if (id) {
      await getCheckTheFavorit(parseInt(id)); // Check the favorites status after every click
    }
  };

  const addFavorite = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/my-favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({ destination_id: id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Add favorite response:", result); // Log API response
        // Check if the response structure contains the expected data
        if (result.status === "success") {
          setIsFavorite(true);
          // Assuming you don't have the favorite ID from the response, you might need to re-fetch the favorites list to update `favoriteId`
          await getCheckTheFavorit(parseInt(id!));
        } else {
          console.error("Unexpected response structure:", result);
        }
      } else {
        console.error("Error adding favorite: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  const removeFavorite = async () => {
    if (favoriteId === null) {
      console.error("Favorite ID is null");
      return;
    }

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/my-favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Remove favorite response:", result); // Log API response
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        console.error("Error removing favorite");
      }
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const handleCommentSubmit = () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setOpenRatingDialog(true); // Open the rating dialog after comment submission
  };

  const handleSubmitRating = async () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/destination/${id}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
          body: JSON.stringify({ rating: tempRating, comments: tempComments }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Submit rating response:", result); // Log API response
        setRating(tempRating);
        setAlreadyRated(true);
        setSubmittedComments([
          ...submittedComments,
          { rating: tempRating!, comments: tempComments, user: user! },
        ]);
        setTempComments(""); // Clear the temporary comment field after submission

        // Save rating status to local storage
        localStorage.setItem(`rated_${email}_${id}`, "true");
      } else {
        console.error("Error submitting rating");
      }
    } catch (error) {
      console.error("Error submitting rating", error);
    }

    setOpenRatingDialog(false); // Close the rating dialog after submission
  };

  const handleRatingChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setTempRating(newValue);
    setOpenCommentDialog(true); // Open the comment dialog after rating change
  };

  const handleSubmitComment = async () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/destination/${id}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
          body: JSON.stringify({ rating: tempRating, comments: tempComments }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Submit comment response:", result); // Log API response
        setRating(tempRating);
        setAlreadyRated(true);
        setSubmittedComments([
          ...submittedComments,
          { rating: tempRating!, comments: tempComments, user: user! },
        ]);
        setTempComments(""); // Clear the temporary comment field after submission

        // Save rating status to local storage
        localStorage.setItem(`rated_${email}_${id}`, "true");
      } else {
        console.error("Error submitting comment");
      }
    } catch (error) {
      console.error("Error submitting comment", error);
    }

    setOpenCommentDialog(false); // Close the comment dialog after submission
  };

  const openGoogleMaps = () => {
    if (destination) {
      window.open(
        `https://www.google.com/maps?q=${destination.lat},${destination.long}`,
        "_blank"
      );
    }
  };

  const fetchLikedGoods = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/auth/destination/${id}/like-unlike`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      const result = await response.json();
      console.log("Liked goods response:", result);
      setLikedGoods(result.data || []);
    } catch (error) {
      console.error("Error fetching liked goods:", error);
    }
  };

  const handleLikeClick = async () => {
    if (!authenticated) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${config.apiUrl}/auth/destination/${id}/like-unlike`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Toggle like response:", result);
        setIsLiked((prev) => !prev);
        fetchLikedGoods();
      } else {
        console.error("Error toggling like");
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  useEffect(() => {
    if (destination) {
      const timeoutId = setTimeout(() => {
        const map = new window.google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: {
              lat: parseFloat(destination.lat),
              lng: parseFloat(destination.long),
            },
            zoom: 8,
          }
        );

        new window.google.maps.Marker({
          position: {
            lat: parseFloat(destination.lat),
            lng: parseFloat(destination.long),
          },
          map,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [destination]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!destination) {
    return (
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Typography variant="h5">Destination not found</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ marginTop: "60px" }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid sx={{ marginTop: "80px" }} item xs={12} md={8}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                src={fileUrl + destination.image1}
                alt={destination.name}
              />
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{ padding: "0", margin: "0" }}
                    variant="h2"
                    gutterBottom
                  >
                    {destination.name}
                  </Typography>
                  <Box>
                    <IconButton onClick={handleLikeClick}>
                      <ThumbUpIcon sx={{ fontSize: "28px" }} />
                    </IconButton>
                    <IconButton onClick={handleFavoriteClick}>
                      <FavoriteIcon
                        sx={{ fontSize: "28px" }}
                        color={isFavorite ? "error" : "disabled"}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ padding: "0", margin: "0" }}
                    variant="body1"
                  >
                    By
                  </Typography>
                  <Avatar
                    alt={destination.user.name}
                    src={fileUrl + destination.user.avatar}
                    sx={{ margin: 1, width: 30, height: 30 }}
                  />
                  <Typography variant="body1">
                    {destination.user.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      size="large"
                      name="destination-rating"
                      value={rating}
                      onChange={handleRatingChange}
                      readOnly={alreadyRated}
                      disabled={alreadyRated} // Add disabled property
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={2} // optional, if you want to add some spacing on top
                  >
                    <FacebookShareButton
                      url={window.location.href}
                      style={{ marginRight: 8 }}
                    >
                      <FacebookIcon size={38} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={window.location.href}
                      title={`Check out this destination: ${destination.id}`}
                      style={{ marginRight: 8 }}
                    >
                      <TwitterIcon size={38} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={window.location.href}
                      title={`Check out this destination: ${destination.id}`}
                      summary={destination.description}
                    >
                      <LinkedinIcon size={38} round />
                    </LinkedinShareButton>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" mt={2}></Box>
                <Typography variant="body1" paragraph>
                  {destination.description}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  <Grid item xs={12}>
                    <Swiper
                      style={{
                        width: "100%",
                        height: "300px", // Adjust height as needed
                      }}
                      loop={true}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      <SwiperSlide>
                        <img
                          src={fileUrl + destination.image2}
                          alt={`${destination.name} additional`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={fileUrl + destination.image3}
                          alt={`${destination.name} additional`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Related Destinations
                  </Typography>
                  <Swiper
                    style={{
                      width: "100%",
                      height: "auto", // Adjust height as needed
                    }}
                    loop={true}
                    spaceBetween={20}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    slidesPerView={3} // Show 3 slides at once
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {destination.related && destination.related.length > 0 ? (
                      destination.related.map((relatedDest) => (
                        <SwiperSlide
                          key={relatedDest.id}
                          style={{ padding: "0 10px" }}
                        >
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={fileUrl + relatedDest.image1}
                              alt={relatedDest.name}
                              sx={{ height: 200, objectFit: "cover" }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {relatedDest.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </SwiperSlide>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No related destinations available.
                      </Typography>
                    )}
                  </Swiper>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ marginTop: "80px" }} item xs={12} md={4}>
            <Typography variant="h6">Google Maps</Typography>
            <Box id="map" style={{ width: "100%", height: "400px" }}></Box>
            <Button
              sx={{ mt: "14px" }}
              variant="contained"
              color="primary"
              onClick={openGoogleMaps}
            >
              Open in Google Maps
            </Button>
            <Box mt={2}>
              <Typography variant="h6">User Comments</Typography>
              {submittedComments.map((submittedComment, index) => (
                <Box
                  sx={{
                    bgcolor: "white",
                    padding: "14px",
                    borderRadius: "14px",

                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  key={index}
                  mb={2}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar
                      alt={submittedComment.user.name}
                      src={fileUrl + submittedComment.user.avatar}
                      sx={{ marginRight: 1, width: 30, height: 30 }}
                    />
                    <Typography variant="body1">
                      {submittedComment.user.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {submittedComment.comments}
                  </Typography>
                  <Rating
                    value={submittedComment.rating}
                    readOnly
                    size="small"
                  />
                </Box>
              ))}
              <TextField
                label="Add a comment"
                multiline
                fullWidth
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </Box>
            <Box mt={4}>
              <Grid container spacing={2}>
                {likedGoods.map((good) => (
                  <Grid item xs={12} sm={6} md={4} key={good.id}>
                    <Card>
                      <CardContent>
                        <Swiper
                          loop={true}
                          spaceBetween={10}
                          navigation={true}
                          color="error"
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          style={{ width: "100%", height: "200px" }}
                        >
                          <SwiperSlide>
                            <img
                              src={fileUrl + destination.image1}
                              alt={destination.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src={fileUrl + destination.image2}
                              alt={destination.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src={fileUrl + destination.image3}
                              alt={destination.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </SwiperSlide>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              sx={{ padding: "0", margin: "0" }}
                              variant="body1"
                            >
                              By
                            </Typography>
                            <Avatar
                              alt={destination.user.name}
                              src={fileUrl + destination.user.avatar}
                              sx={{ margin: 1, width: 30, height: 30 }}
                            />
                            <Typography variant="body1">
                              {destination.user.name}
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" mt={2}></Box>
                          <Typography variant="body1" paragraph>
                            {destination.description}
                          </Typography>
                        </Swiper>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
        />
        <Dialog
          open={openRatingDialog}
          onClose={() => setOpenRatingDialog(false)}
        >
          <DialogTitle>Submit Your Rating</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add your rating for the comment.
            </DialogContentText>
            <Rating
              size="large"
              name="comment-rating"
              value={tempRating}
              onChange={(_event, newValue) => setTempRating(newValue)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRatingDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitRating} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCommentDialog}
          onClose={() => setOpenCommentDialog(false)}
        >
          <DialogTitle>Submit Your Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add your comment for the rating.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comments"
              label="Comments"
              type="text"
              fullWidth
              value={tempComments}
              onChange={(e) => setTempComments(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCommentDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitComment} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default DestinationDetails;
