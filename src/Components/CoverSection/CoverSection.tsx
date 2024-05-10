import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button, // Import Grid component from MUI
} from "@mui/material";

const CoverSection = () => {
  const [currentCover, setCurrentCover] = useState(0);
  const [covers] = useState<File[]>([]);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const uploadedCovers: File[] = Array.from(event.target.files);
  //     setCovers(uploadedCovers);
  //     setCurrentCover(0);
  //   }
  // };

  const goToNextCover = () => {
    setCurrentCover((prevIndex) => (prevIndex + 1) % covers.length);
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: "#ddd", padding: "50px 0", height: "400px " }}
      >
        <Container maxWidth="md">
          {covers.length > 0 && (
            <img
              src={URL.createObjectURL(covers[currentCover])}
              alt={`Cover ${currentCover + 1}`}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}

          <Typography variant="h5" align="center" gutterBottom>
            Explore the World with Us
          </Typography>
          <Typography variant="subtitle1" align="center">
            Discover amazing destinations and create unforgettable memories.
          </Typography>
          {covers.length > 1 && (
            <Button variant="contained" onClick={goToNextCover}>
              Next Cover
            </Button>
          )}
        </Container>
      </Box>
    </>
  );
};

export default CoverSection;
