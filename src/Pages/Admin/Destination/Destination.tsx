import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
  Grid,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CheckIcon from '@mui/icons-material/Check';

import config from "../../../Api/config";
import { BorderAll, Margin, Padding } from "@mui/icons-material";




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

const AdminTable: React.FC = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    number | null
  >(null);
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

  const fileUrl = config.fileUrl;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    fetchCategories();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData.data);
      } else {
        console.log("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);

    setNewDestination({
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
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDestinationId(null);
  };

  const handleEditDestination = async (id: number) => {
    setSelectedDestinationId(id);
    await handleGetIdFerDestination(id);
    setOpenDialog(true);
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
  const [imageInputsFilled, setImageInputsFilled] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

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
        setUploadedImages((prevImages) => [
          ...prevImages,
          reader.result as string,
        ]);
        setImageInputsFilled((prevFilled) => {
          const filledCopy = [...prevFilled];
          filledCopy[index] = true;
          return filledCopy;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDestination = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify(newDestination),
      });

      if (response.ok) {
        getData();
        handleCloseDialog();
      } else {
        console.log("Failed to create destination:", response.status);
      }
    } catch (error) {
      console.error("Error creating destination:", error);
    }
    setNewDestination({
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
    setOpenDialog(true);
  };

  const handleUpdateDestination = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/admin/destination/${selectedDestinationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
          body: JSON.stringify(newDestination),
        }
      );

      if (response.ok) {
        getData();
        handleCloseDialog();
      } else {
        console.log("Failed to update destination:", response.status);
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  const hanlerViewDetails = async (ButtonEditId: number) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/admin/destination/${ButtonEditId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        navigate("/DestinationDetails", { state: { result } });
      } else {
        console.log("Failed to fetch destination:", response.status);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const handleGetIdFerDestination = async (ButtonEditId: number) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/admin/destination/${ButtonEditId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const destinationData = await response.json();
        setNewDestination(destinationData.data);
        setOpenDialog(true);
      } else {
        console.log("Failed to fetch destination:", response.status);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const handleRemoveDestination = async (deletedId: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this destination?"
      );
      if (!confirmed) return;

      const response = await fetch(
        `${config.apiUrl}/admin/destination/${deletedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
          },
        }
      );

      if (response.ok) {
        getData();
        handleCloseDialog();
      } else {
        console.log("Failed to delete destination:", response.status);
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

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
        const result = category.data;
        setCategories(result);
        console.log(result);
      } else {
        console.log("Failed to category:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DEDEDE",

      border: "none",
      padding: "14px",
      BorderAll: "10px",
      fontWeight: "bold",
      fontSize: "16px",
      "&:first-child": {
        borderTopLeftRadius: "14px",
        paddingLeft: "20px",
        borderBottomLeftRadius: "14px",
      },
      "&:last-child": {
        borderTopRightRadius: "14px",
        borderBottomRightRadius: "14px",
      },
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "none",
      "&:first-child": {
        borderTopLeftRadius: "14px",
        paddingLeft: "20px",
        borderBottomLeftRadius: "14px",
      },
      "&:last-child": {
        borderTopRightRadius: "14px",
        borderBottomRightRadius: "14px",
      },
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return text;
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          padding: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Destination</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Add New
        </Button>
      </Box>

      <Box sx={{ bgcolor: "white", padding: "20px" }}>
        <TableContainer sx={{ borderRadius: "14px" }} component={Paper}>
          <Box sx={{ padding: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ padding: "1  0" }}>ID</StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>Name</StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Images
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Description
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Province
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Category
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Location
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Created At
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Updated At
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "0" }}>
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <Box sx={{ padding: "14px" }}></Box>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell sx={{ padding: "20px" }}>
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {row.image1 && (
                          <img
                            src={fileUrl + row.image1}
                            alt="Destination"
                            style={{
                              width: 40,
                              height: 40,
                              marginRight: "10px",
                            }}
                          />
                        )}
                        {row.image2 && (
                          <img
                            src={fileUrl + row.image2}
                            alt="Destination"
                            style={{
                              width: 40,
                              height: 40,
                              marginRight: "10px",
                            }}
                          />
                        )}
                        {row.image3 && (
                          <img
                            src={fileUrl + row.image3}
                            alt="Destination"
                            style={{
                              width: 40,
                              height: 40,
                              marginRight: "10px",
                            }}
                          />
                        )}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        padding: "20px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {row.province ? row.province.name : ""}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {row.category ? row.category.name : ""}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {row.lat}, {row.long}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {new Date(row.created_at).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "0" }}>
                      {new Date(row.updated_at).toLocaleDateString()}
                    </StyledTableCell>

                    <StyledTableCell sx={{ padding: "0" }}>
                      <Button
                        onClick={() => row.id && hanlerViewDetails(row.id)}
                      >
                        <PreviewIcon sx={{ color: "black" }} />
                      </Button>
                      <Button
                        onClick={() => row.id && handleEditDestination(row.id)}
                      >
                        <EditIcon sx={{ color: "blue" }} />
                      </Button>
                      <Button
                        onClick={() =>
                          row.id && handleRemoveDestination(row.id)
                        }
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedDestinationId ? "Edit Destination" : "Add New Destination"}
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              {/* Name */}
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
              {/* Category and Province */}
              <Grid item xs={6}>
                <TextField
                  select
                  margin="dense"
                  id="category_id"
                  name="category_id"
                  label="Category"
                  fullWidth
                  value={newDestination.category_id.id}
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* Description */}
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
              {/* Latitude and Longitude */}
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
              {/* Image upload fields */}
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
                        handleImageChange(e, `image${index}`, index - 1)
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={
              selectedDestinationId
                ? handleUpdateDestination
                : handleAddDestination
            }
            color="primary"
            variant="contained"
          >
            {selectedDestinationId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminTable;
