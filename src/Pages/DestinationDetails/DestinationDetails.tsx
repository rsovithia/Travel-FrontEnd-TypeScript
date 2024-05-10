import {
  Typography,
  Paper,
  Box,
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
} from "@mui/material";

function DestinationDetails() {
  // Mock data for destination details
  const destination = {
    name: "Beach Resort Paradise",
    location: "Tropical Island",
    description:
      "Escape to our luxurious beach resort paradise located on a beautiful  .",
  };

  return (
    <>
      <Box>
        <Box sx={{ padding: "60px" }}></Box>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "left",
            padding: "0 200px   0",
          }}
        >
          <Box
            sx={{
              marginBottom: "20px",
              width: "250px",

              height: "250px",
              bgcolor: "red",
            }}
          ></Box>
          <Box sx={{ marginBottom: "20px", padding: "40px" }}>
            <Typography variant="h5" gutterBottom>
              Destination Details
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <strong>Name:</strong> {destination.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <strong>Location:</strong> {destination.location}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <strong>Description:</strong> {destination.description}
            </Typography>
          </Box>
        </Paper>
        <Paper
          sx={{ display: "flex", justifyContent: "center", padding: "0 200px" }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Learn more about AI Text Generator: What is Genius Mode? It is an
              enhanced version of AI Chat that provides more knowledge, fewer
              errors, improved reasoning skills, better verbal fluidity, and an
              overall superior performance. Due to the larger AI model, Genius
              Mode is only available via subscription to DeepAI Pro. However,
              the added benefits often make it a worthwhile investment. What is
              Online Mode? It is an add on that enables AI Chat to browse the
              web for real-time information. It is a great way to learn new
              things and explore new topics. Sign in to your DeepAI account (no
              subscription required!) to gain access to this feature. Ideas for
              Chatting with the AI - Can you describe the concept of relativity
              to me in layman's terms? - What are some unique and entertaining
              ways to celebrate a friend's anniversary? - Could you walk me
              through how to use loops in Python? Strengths - Can recall
              information from previous conversations to provide personalized
              responses. - Allows users to correct any misunderstandings or
              errors in the previous interaction. - Is programmed to refuse
              inappropriate or harmful requests. Weaknesses - Can occasionally
              provide incorrect information due to limitations in its training
              data or understanding. - May inadvertently provide instructions or
              suggestions that are harmful or biased without realizing it. -
              Limited knowledge of current events and developments beyond the
              training data cutoff of 2021.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Changed from alignContent to alignItems
        }}
      >
        <Box sx={{ width: "50%", padding: "100px", height: "50%" }}>
          <Box sx={{ bgcolor: "red", width: "87vh", height: "40vh" }}>
            image
          </Box>
        </Box>
        <Box sx={{ width: "50%", padding: "100px", height: "100%" }}>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Learn more about AI Text Generator:
            </Typography>
            <Typography variant="body1">
              What is Genius Mode? It is an enhanced version of AI Chat that
              provides more knowledge, fewer errors, improved reasoning skills,
              better verbal fluidity, and an overall superior performance. Due
              to the larger AI model, Genius Mode is only available via
              subscription to DeepAI Pro. However, the added benefits often make
              it a worthwhile investment.
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
              What is Genius Mode? It is an enhanced version of AI Chat that
              provides more knowledge, fewer errors, improved reasoning skills,
              better verbal fluidity, and an overall superior performance. Due
              to the larger AI model, Genius Mode is only available via
              subscription to DeepAI Pro. However, the added benefits often make
              it a worthwhile investment.
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
          sd
        </Box>
        <Box sx={{ width: "50%", padding: "100px", height: "100%" }}>
          <Box sx={{ bgcolor: "red", width: "87vh", height: "40vh" }}></Box>
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
    </>
  );
}

export default DestinationDetails;