import { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Sidebar from "./../Navbar/MenulList";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when drawer is open
    } else {
      document.body.style.overflow = "visible"; // Allow scrolling when drawer is closed
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    document.body.style.overflow = "visible"; // Ensure scrolling is allowed when drawer is closed
  };

  return (
    <Grid
      container
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
      className="Navbar"
      style={{
        background:
          "linear-gradient(260deg, rgba(223, 110, 26, 0.8), rgba(237, 168, 33, 0.8))", 
        boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
        height: "80px",
        display: "flex",
        margin: "0",
        zIndex: "998",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        width: "94%",
        borderRadius: "10px",
      }}
    >
      <Grid item>
        <Typography variant="h6">Travel Logo</Typography>
      </Grid>
      <Grid item>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {isSmallScreen ? (
            <>
              <Button color="inherit" onClick={toggleMenu}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
              <Sidebar open={menuOpen} onClose={handleMenuClose} />
            </>
          ) : (
            <Grid container>
              <Grid item>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/destinations">
                  Destinations
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/#">
                  Recommandation
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </Grid>

              {/* <Grid item>
                <Button color="inherit" component={Link} to="/contact">
                  Contact
                </Button>
              </Grid> */}
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
