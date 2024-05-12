import React, { useState, useEffect } from "react"; // Importing useState and useEffect
import { Typography, Paper, Box, Container } from "@mui/material";
import config from "../../Api/config";
import { useLocation } from "react-router-dom";

function DestinationDetails() {
  const location = useLocation();

  const objectData = location.state.result.data;

  const fileUrl = config.fileUrl;
  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: "#ddddd",
            padding: "0px 0",
            height: "400px",
            width: "100vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dark overlay on the left */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "50vw", // Adjust the width according to your design
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
            }}
          />

          {/* Dark overlay on the right */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "50vw", // Adjust the width according to your design
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
            }}
          />

          <Container
            maxWidth="md"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative", // Add this to make sure the image stays on top of overlays
              zIndex: 1, // Add this to ensure the image is on top of overlays
            }}
          >
            <img
              src={fileUrl + objectData.image1}
              alt={"image1"}
              style={{ width: "100%", height: "auto" }}
            />
          </Container>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ width: "60%", padding: "100px", height: "50%" }}>
          <Typography variant="h3" sx={{ textAlign: "start", color: "red" }}>
            {objectData.name}
 
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "40%", padding: "20px", height: "50%" }}>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {objectData.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "50%", padding: "20px", height: "100%" }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <img
              src={fileUrl + objectData.image1}
              alt={"image1"}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Changed from alignContent to alignItems
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "100px",
            gap: "10px",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Each child Box with red background, fixed width, and height */}
          <Box sx={{ width: "50vh", height: "auto" }}>
            {" "}
            <img
              src={fileUrl + objectData.image1}
              alt={"image1"}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box sx={{ width: "50vh", height: "auto" }}>
            {" "}
            <img
              src={fileUrl + objectData.image2}
              alt={"image2"}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box sx={{ width: "50vh", height: "auto" }}>
            {" "}
            <img
              src={fileUrl + objectData.image3}
              alt={"image3"}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DestinationDetails;
