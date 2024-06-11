import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
 
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
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import config from "../../../Api/config";

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

const AdminTable: React.FC = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
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
  const [imageInputsFilled, setImageInputsFilled] = useState<boolean[]>([false, false, false]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const fileUrl = config.fileUrl;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    fetchCategories();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/destination`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData.data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
        setCategories(category.data);
      } else {
        console.error("Failed to fetch categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    await handleGetDestinationById(id);
    setOpenDialog(true);
  };

  const handleGetDestinationById = async (id: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      if (response.ok) {
        const destinationData = await response.json();
        setNewDestination(destinationData.data);
      } else {
        console.error("Failed to fetch destination:", response.status);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const handleRemoveDestination = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this destination?");
    if (!confirmed) return;
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      if (response.ok) {
        getData();
      } else {
        console.error("Failed to delete destination:", response.status);
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/destination/${id}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, imageField: keyof Destination, index: number) => {
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
        console.error("Failed to create destination:", response.status);
      }
    } catch (error) {
      console.error("Error creating destination:", error);
    }
  };

  const handleUpdateDestination = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/${selectedDestinationId}`, {
        method: "PUT",
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
        console.error("Failed to update destination:", response.status);
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DEDEDE",
      border: "none",
      padding: "14px",
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Images</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Province</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Location</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Updated At</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>
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
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.province_id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.category_id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.lat}, {row.long}
                    </StyledTableCell>
                    <StyledTableCell>
                      {new Date(row.created_at).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {new Date(row.updated_at).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => row.id && handleViewDetails(row.id)}>
                        <PreviewIcon sx={{ color: "black" }} />
                      </Button>
                      <Button onClick={() => row.id && handleEditDestination(row.id)}>
                        <EditIcon sx={{ color: "blue" }} />
                      </Button>
                      <Button onClick={() => row.id && handleRemoveDestination(row.id)}>
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
                        handleImageChange(e, `image${index}` as keyof Destination, index - 1)
                      }
                    />
                  </Button>
                  {imageInputsFilled[index - 1] && <CheckIcon style={{ color: "green" }} />}
                </Grid>
              ))}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={selectedDestinationId ? handleUpdateDestination : handleAddDestination}
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
