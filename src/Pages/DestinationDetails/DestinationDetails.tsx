import React, { useState, useEffect } from "react"; // Importing useState and useEffect
import { Typography, Paper, Box, Container } from "@mui/material";
import config from "../../Api/config";
import { useLocation } from 'react-router-dom';

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
              src={fileUrl+objectData.image1}
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
          
            {/* {data.length > 0 ? `Name : ${data[0].name}` : " "} */}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Changed from alignContent to alignItems
        }}
      >
        <Box sx={{ width: "50%", padding: "100px", height: "50%" }}>
          {" "}
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Learn more about AI Text Generator:
            </Typography>
            <Typography variant="body1">
            {objectData.description}
            </Typography>
            <Typography variant="body1">
              What is Online Mode? It is an add-on that enables AI Chat to
              browse the web for real-time information. It is a great way to
              learn new things and explore new topics. Sign in to your DeepAI
              account (no subscription required!) to gain access to this
              feature.
            </Typography>
            <Typography variant="body1">
              Ideas for Chatting with the AI:
              <ul>
                <li>
                  Can you describe the concept of relativity to me in layman's
                  terms?
                </li>
                <li>
                  What are some unique and entertaining ways to celebrate a
                  friend's anniversary?
                </li>
                <li>Could you walk me through how to use loops in Python?</li>
              </ul>
            </Typography>
            <Typography variant="body1">
              Strengths:
              <ul>
                <li>
                  Can recall information from previous conversations to provide
                  personalized responses.
                </li>
                <li>
                  Allows users to correct any misunderstandings or errors in the
                  previous interaction.
                </li>
                <li>
                  Is programmed to refuse inappropriate or harmful requests.
                </li>
              </ul>
            </Typography>
            <Typography variant="body1">
              Weaknesses:
              <ul>
                <li>
                  Can occasionally provide incorrect information due to
                  limitations in its training data or understanding.
                </li>
                <li>
                  May inadvertently provide instructions or suggestions that are
                  harmful or biased without realizing it.
                </li>
                <li>
                  Limited knowledge of current events and developments beyond
                  the training data cutoff of 2021.
                </li>
              </ul>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "50%", padding: "100px", height: "100%" }}>
          <Box sx={{ bgcolor: "red", width: "87vh", height: "40vh" }}></Box>
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
          <Box sx={{ bgcolor: "red", width: "50vh", height: "40vh" }}></Box>
          <Box sx={{ bgcolor: "red", width: "50vh", height: "40vh" }}></Box>
          <Box sx={{ bgcolor: "red", width: "50vh", height: "40vh" }}></Box>
        </Box>
      </Box>
    </>
  );
}

export default DestinationDetails;
