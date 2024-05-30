import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../Auth/auth";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
}

const Navbar: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser: User = {
      id: localStorage.getItem("id") || "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      profilePicture: localStorage.getItem("avatar") || "/mnt/data/image.png",
      role: localStorage.getItem("role") || "",
    };

    if (storedUser.id) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) => ({ name, calories, fat, carbs, protein });

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Container sx={{ marginTop: 15 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          textAlign: "center",
        }}
      >
        {user && (
          <>
            <Avatar
              alt={user.name}
              src={user.profilePicture}
              sx={{ width: 56, height: 56, marginBottom: 1 }}
            />
            <Typography fontSize="20px" fontWeight={600} variant="body1">
              {user.name}
            </Typography>
            <Typography fontSize="14px" variant="body2" color="textSecondary">
              {user.id}
            </Typography>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
          textAlign: "center",
        }}
      >
        {user?.role === "admin" ? (
          <>
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "20px 0 0 20px",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Dashboard
            </Button>
            <Button
              type="button"
              className="logout"
              onClick={handleLogout}
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "0 20px 20px 0",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "20px 0 0 20px",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDialogOpen}
            >
              Post
            </Button>
            <Button
              type="button"
              className="logout"
              onClick={handleLogout}
              sx={{
                width: "100px",
                backgroundColor: "#DF6E1A",
                borderRadius: "0 20px 20px 0",
                color: "black",
                fontWeight: "600",
                border: "1px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "left", marginBottom: 2 }}>
        <Button
 
          sx={{
            textDecoration: showTable ? "underline" : "none",
            marginRight: 2,
          }}
          onClick={() => setShowTable(true)}
        >
          Table
        </Button>
        <Button
          sx={{
            textDecoration: !showTable ? "underline" : "none",
          }}
          onClick={() => setShowTable(false)}
        >
          Card
        </Button>
      </Box>
      <Box>
        {showTable ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can create a new post.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Navbar;
