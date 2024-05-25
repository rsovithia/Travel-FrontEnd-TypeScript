import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  MenuItem,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const user = {
    name: "Rith",
    email: "vithiasokh@gmail.com",
    profilePicture: "/path/to/profile.jpg",
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      if (prevScrollPos < currentScrollPos && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, open]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    document.body.style.overflow = menuOpen ? "hidden" : "visible";
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const prevOpen = useRef(open);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={`Navbar ${visible ? "visible" : "hidden"}`}
      style={{
        background:
          "linear-gradient(260deg, rgba(223, 110, 26, 0.8), rgba(237, 168, 33, 0.8))",
        boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
        height: "80px",
        zIndex: 998,
        position: "fixed",
        top: visible ? "20px" : "-80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "98%",
        borderRadius: "10px",
        transition: "top 0.3s",
      }}
    >
      <Grid item>
        <Typography sx={{ fontWeight: 600 }} variant="h5">
          Travel Logo
        </Typography>
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isSmallScreen ? (
            <>
              <IconButton color="inherit" onClick={toggleMenu}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/destinations">
                Destinations
              </Button>
              <Button color="inherit" component={Link} to="/#">
                Recommendation
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                ref={anchorRef}
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Dashboard
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "right bottom"
                          : "center top",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          sx={{ width: "250px" }}
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "16px",
                                textAlign: "center",
                                width: "100%", // Added to center content
                              }}
                            >
                              <Avatar
                                alt={user.name}
                                src={user.profilePicture}
                                sx={{ width: 56, height: 56, marginBottom: 1 }}
                              />
                              <Typography variant="body1">
                                {user.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </MenuItem>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              padding: "16px",
                              textAlign: "center",
                            }}
                          >
                            <Button variant="outlined">Delete</Button>
                            <Button variant="contained">Send</Button>
                          </Box>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
