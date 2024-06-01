import React, { useState, useEffect, useRef, ChangeEvent } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import "./Navbar.css";
import config from "../../Api/config";
import { logout } from "../../Auth/auth";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
}

interface Destination {
  id?: number;
  name: string;
  description: string;
  province_id: number;
  category_id: string;
  lat: string;
  long: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  created_at: string;
  updated_at: string;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newDestination, setNewDestination] = useState<Destination>({
    name: "",
    description: "",
    province_id: 0,
    category_id: "",
    lat: "",
    long: "",
    image1: "",
    image2: "",
    image3: "",
    created_at: "",
    updated_at: "",
  });
  const [imageInputsFilled, setImageInputsFilled] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

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

  useEffect(() => {
    const storedUser = {
      id: localStorage.getItem("id") || "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      profilePicture: localStorage.getItem("avatar") || "",
      role: localStorage.getItem("role") || "",
    };

    if (storedUser.id) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      if (response.ok) {
        const category = await response.json();
        setCategories(category.data);
      } else {
        console.error("Failed to fetch categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    document.body.style.overflow = menuOpen ? "hidden" : "visible";
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    imageField: keyof Destination,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDestination((prevDestination) => ({
          ...prevDestination,
          [imageField]: reader.result as string,
        }));
        setImageInputsFilled((prevFilled) => {
          const filledCopy = [...prevFilled];
          filledCopy[index] = true;
          return filledCopy;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const method = newDestination.id ? "PUT" : "POST";
    const url = newDestination.id
      ? `${config.apiUrl}/admin/destination/${newDestination.id}`
      : `${config.apiUrl}/admin/destination/add`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify(newDestination),
      });
      if (response.ok) {
        // Handle successful save
        setOpenCreateDialog(false);
      } else {
        console.error("Failed to save destination:", response.status);
      }
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

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
      <Grid
        item
        sx={{
          flexGrow: 1,
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/destinations">
          Destinations
        </Button>
        <Button color="inherit" component={Link} to="/#">
          Recommendation
        </Button>
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
          onClick={() => setOpenCreateDialog(true)}
        >
          Post
        </Button>
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
            <IconButton color="inherit" onClick={toggleMenu}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <>
              {user ? (
                <>
                  <IconButton
                    ref={anchorRef}
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <Avatar alt={user.name} src={user.profilePicture} />
                  </IconButton>
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
                              : "right top",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              sx={{ width: "260px" }}
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Avatar
                                    alt={user.name}
                                    src={user.profilePicture}
                                    sx={{
                                      width: 56,
                                      height: 56,
                                      marginBottom: 1,
                                    }}
                                  />
                                  <Typography
                                    fontSize={"20px"}
                                    fontWeight={600}
                                    variant="body1"
                                  >
                                    {user.name}
                                  </Typography>
                                  <Typography
                                    fontSize={"14px"}
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {user.email}
                                  </Typography>

                                  <Button
                                    variant="outlined"
                                    sx={{
                                      mt: 2,
                                      width: "64%",
                                      fontWeight: "bold",
                                      fontSize: "14px",
                                      color: "#DF6E1A",
                                      textTransform: "none",
                                      borderColor: "#DF6E1A",
                                      "&:hover": {
                                        borderColor: "#DF6E1A",
                                      },
                                    }}
                                    component={Link}
                                    to="/userpages "
                                  >
                                    View Profile
                                  </Button>
                                </Box>
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
                                {user.role === "admin" ? (
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
                                      onClick={() => setOpenCreateDialog(true)}
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
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Disagree</Button>
          <Button onClick={handleDialogClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>
          {newDestination.id ? "Edit Destination" : "Add New Destination 2"}
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={newDestination.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="province_id"
                  name="province_id"
                  label="Province ID"
                  type="number"
                  fullWidth
                  value={newDestination.province_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  margin="dense"
                  id="category_id"
                  name="category_id"
                  label="Category"
                  fullWidth
                  value={newDestination.category_id}
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={newDestination.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="lat"
                  name="lat"
                  label="Latitude"
                  type="text"
                  fullWidth
                  value={newDestination.lat}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="long"
                  name="long"
                  label="Longitude"
                  type="text"
                  fullWidth
                  value={newDestination.long}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Images
                </Typography>
              </Grid>
              {[1, 2, 3].map((index) => (
                <Grid item xs={12} sm={4} key={`image${index}`}>
                  <Button
                    variant="outlined"
                    component="label"
                    htmlFor={`image${index}`}
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    Choose Image {index}
                    <Input
                      type="file"
                      id={`image${index}`}
                      inputProps={{ accept: "image/*" }}
                      style={{ display: "none" }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleImageChange(
                          e,
                          `image${index}` as keyof Destination,
                          index - 1
                        )
                      }
                    />
                  </Button>
                  {imageInputsFilled[index - 1] && (
                    <CheckIcon style={{ color: "green" }} />
                  )}
                </Grid>
              ))}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            {newDestination.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Navbar;
