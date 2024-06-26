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
  DialogTitle,
  TextField,
  Input,
  Select,
  FormControl,
  DialogContentText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import "./Navbar.css";
import config from "../../Api/config";
import Logo from "../../assets/logo.svg";
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

interface Category {
  id: number;
  name: string;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newDestination, setNewDestination] = useState<Destination>({
    name: "",
    description: "",
    province_id: 0,
    category_id: "",
    lat: "",
    long: "",
    image1: null,
    image2: null,
    image3: null,
    created_at: "",
    updated_at: "",
  });
  const [imageInputsFilled, setImageInputsFilled] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setScrolled(currentScrollPos > 0);
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
      const response = await fetch(`${config.apiUrl}/auth/category`, {
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
    document.body.style.overflow = menuOpen ? "visible" : "hidden";
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
        setImagePreviews((prevPreviews) => {
          const previewsCopy = [...prevPreviews];
          previewsCopy[index] = reader.result as string;
          return previewsCopy;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const method = newDestination.id ? "PUT" : "POST";
    const url = newDestination.id
      ? `${config.apiUrl}/auth/destination/${newDestination.id}`
      : `${config.apiUrl}/auth/destination/add`;

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
        setOpenCreateDialog(false);
      } else {
        console.error("Failed to save destination:", response.status);
      }
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  const prevOpen = useRef(open);

  const initMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 11.5564, lng: 104.9282 },
        zoom: 8,
      }
    );

    const marker = new window.google.maps.Marker({
      position: { lat: 11.5564, lng: 104.9282 },
      map,
      draggable: true,
    });

    marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat().toString() || "";
      const lng = event.latLng?.lng().toString() || "";
      setNewDestination((prevDestination) => ({
        ...prevDestination,
        lat,
        long: lng,
      }));
    });

    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat().toString() || "";
      const lng = event.latLng?.lng().toString() || "";
      setNewDestination((prevDestination) => ({
        ...prevDestination,
        lat,
        long: lng,
      }));
      marker.setPosition(event.latLng!);
    });

    placesServiceRef.current = new google.maps.places.PlacesService(map);

    if (inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry) {
          const lat = place.geometry.location?.lat().toString() || "";
          const lng = place.geometry.location?.lng().toString() || "";
          setNewDestination((prevDestination) => ({
            ...prevDestination,
            lat,
            long: lng,
          }));
          marker.setPosition(place.geometry.location!);
          map.setCenter(place.geometry.location!);
          map.setZoom(15);
        }
      });
    }
  };

  const handleSearch = () => {
    const query = searchInputRef.current?.value;
    if (query && placesServiceRef.current) {
      placesServiceRef.current.textSearch({ query }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const place = results[0];
          if (place.geometry) {
            const lat = place.geometry.location?.lat().toString() || "";
            const lng = place.geometry.location?.lng().toString() || "";
            setNewDestination((prevDestination) => ({
              ...prevDestination,
              lat,
              long: lng,
            }));
            const map = new google.maps.Map(
              document.getElementById("map") as HTMLElement,
              {
                center: { lat: parseFloat(lat), lng: parseFloat(lng) },
                zoom: 15,
              }
            );
            const marker = new google.maps.Marker({
              position: { lat: parseFloat(lat), lng: parseFloat(lng) },
              map,
              draggable: true,
            });
            marker.setPosition(place.geometry.location!);
            map.setCenter(place.geometry.location!);
            marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
              const newLat = event.latLng?.lat().toString() || "";
              const newLng = event.latLng?.lng().toString() || "";
              setNewDestination((prevDestination) => ({
                ...prevDestination,
                lat: newLat,
                long: newLng,
              }));
            });
          }
        }
      });
    }
  };

  useEffect(() => {
    if (openCreateDialog) {
      setTimeout(() => initMap(), 500);
    }
  }, [openCreateDialog]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={`Navbar ${visible ? "visible" : "hidden"}`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 1)",
        backdropFilter: "blur(80px)",
        boxShadow: scrolled ? "0 5px 15px 0 rgba(0, 0, 0, 0.9)" : "none",
        height: "80px",
        zIndex: 998,
        position: "fixed",
        top: "4px",
        left: "50%",
        padding: "0 14px 0 70px",
        transform: "translateX(-50%)",
        width: "99.5%",
        borderRadius: "10px",
        transition: "top 0.3s, background-color 0.3s, box-shadow 0.3s",
      }}
    >
      <Grid item>
        <Box display="flex" alignItems="center">
          <img src={Logo} alt="Logo" style={{ width: 50, height: 50 }} />
          <Typography
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: "26px",
              marginLeft: "10px",
            }}
          >
            Smart Voyage
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
          display: "flex",
          gap: "80px",
          marginLeft: "700px",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 500, color: "white", fontSize: "18px" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none" }}
          >
            Home
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, color: "white", fontSize: "18px" }}
            component={Link}
            to="/destinations"
            style={{ textDecoration: "none" }}
          >
            Destinations
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, color: "white", fontSize: "18px" }}
            component={Link}
            to="/RecommendationPages"
            style={{ textDecoration: "none" }}
          >
            Recommendation
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, color: "white", fontSize: "18px" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none" }}
          >
            About Us
          </Typography>
        </Box>
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
                                    color={scrolled ? "white" : "black"}
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
                                    to="/userpages"
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
                                      style={{
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
                <Box display={"flex"} gap={2}>
                  <Button
                    sx={{ color: scrolled ? "white" : "white" }}
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Box
                    sx={{ bgcolor: "white", padding: "1px", height: "30px" }}
                  />
                  <Button
                    variant="outlined"
                    sx={{ color: scrolled ? "white" : "white" }}
                    color="inherit"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </Box>
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
          {newDestination.id ? "Edit Destination" : "Add New Destination"}
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
                <FormControl fullWidth>
                  Province
                  <Select
                    labelId="province-select-label"
                    value={newDestination.province_id}
                    onChange={(e) =>
                      setNewDestination((prevDestination) => ({
                        ...prevDestination,
                        province_id: e.target.value as number,
                      }))
                    }
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={1}>Banteay Meanchey</MenuItem>
                    <MenuItem value={2}>Kampong Cham</MenuItem>
                    <MenuItem value={3}>Tboung Khmum</MenuItem>
                    <MenuItem value={4}>Battambang</MenuItem>
                    <MenuItem value={5}>Kampong Chhnang</MenuItem>
                    <MenuItem value={6}>Kampong Speu</MenuItem>
                    <MenuItem value={7}>Kampong Thom</MenuItem>
                    <MenuItem value={8}>Kampot</MenuItem>
                    <MenuItem value={9}>Kandal</MenuItem>
                    <MenuItem value={10}>Koh Kong</MenuItem>
                    <MenuItem value={11}>Kratié</MenuItem>
                    <MenuItem value={12}>Mondulkiri</MenuItem>
                    <MenuItem value={13}>Phnom Penh</MenuItem>
                    <MenuItem value={14}>Preah Vihear</MenuItem>
                    <MenuItem value={15}>Prey Veng</MenuItem>
                    <MenuItem value={16}>Pursat</MenuItem>
                    <MenuItem value={17}>Ratanakiri</MenuItem>
                    <MenuItem value={18}>Siem Reap</MenuItem>
                    <MenuItem value={19}>Preah Sihanouk</MenuItem>
                    <MenuItem value={20}>Stung Treng</MenuItem>
                    <MenuItem value={21}>Svay Rieng</MenuItem>
                    <MenuItem value={22}>Takéo</MenuItem>
                    <MenuItem value={23}>Oddar Meanchey</MenuItem>
                    <MenuItem value={24}>Kep</MenuItem>
                    <MenuItem value={25}>Pailin</MenuItem>
                    <MenuItem value={26}>Tboung Khmum</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  Category
                  <Select
                    labelId="category-select-label"
                    value={newDestination.category_id}
                    onChange={(e) =>
                      setNewDestination((prevDestination) => ({
                        ...prevDestination,
                        category_id: e.target.value as string,
                      }))
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  inputRef={inputRef}
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
                <TextField
                  margin="dense"
                  id="search"
                  name="search"
                  label="Search Location"
                  type="text"
                  fullWidth
                  inputRef={searchInputRef}
                />
                <Button onClick={handleSearch} variant="contained" color="primary">
                  Search
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  id="map"
                  style={{ width: "100%", height: "400px", marginTop: "20px" }}
                ></Box>
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
                    {imagePreviews[index - 1] ? (
                      <img
                        src={imagePreviews[index - 1]!}
                        alt={`Preview ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      `Choose Image ${index}`
                    )}
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
