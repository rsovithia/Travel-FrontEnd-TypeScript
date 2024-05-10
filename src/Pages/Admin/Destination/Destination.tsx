import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";

// Mock data (replace this with actual data fetched from backend)
const mockData = [
  {
    id: 1,
    name: "Destination 1",
    image1: "image1-url",
    image2: "image2-url",
    image3: "image3-url",
    description: "Description of Destination 1",
    province_id: 1,
    category_id: 1,
    lat: "latitude",
    long: "longitude",
    created_at: "2024-05-10 12:00:00",
    updated_at: "2024-05-10 12:00:00",
  },
  {
    id: 2,
    name: "Destination 2",
    image1: "image1-url",
    image2: "image2-url",
    image3: "image3-url",
    description: "Description of Destination 2",
    province_id: 2,
    category_id: 2,
    lat: "latitude",
    long: "longitude",
    created_at: "2024-05-10 12:00:00",
    updated_at: "2024-05-10 12:00:00",
  },
];

type Destination = {
  // Example fields, adjust according to actual data structure
  id: number;
  name: string;
  description: string;
};

export default function AdminTable() {
  const [data, setData] = useState<Destination[] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: "",
    description: "",
    province_id: "",
    category_id: "",
    lat: "",
    long: "",
    image: null, // to store selected image file
  });

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
        setData(jsonData);
      } else {
        console.log("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewDestination({
      ...newDestination,
      [name]: value,
    });
  };

  // const handleImageChange = (e: { target: { files: any[] } }) => {
  //   // Store the selected image file in the state
  //   setNewDestination({
  //     ...newDestination,
  //     image: e.target.files[0],
  //   });
  // };

  const handleAddDestination = () => {
    // Handle adding new destination logic here, e.g., send data to backend
    console.log("New Destination:", newDestination);
    // Close the dialog after adding
    handleCloseDialog();
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
        <Typography>Destination</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Add New
        </Button>
      </Box>

      <Box sx={{ bgcolor: "white", padding: "25px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image 1</TableCell>
                <TableCell>Image 2</TableCell>
                <TableCell>Image 3</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Province ID</TableCell>
                <TableCell>Category ID</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.image1}</TableCell>
                  <TableCell>{row.image2}</TableCell>
                  <TableCell>{row.image3}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.province_id}</TableCell>
                  <TableCell>{row.category_id}</TableCell>
                  <TableCell>{row.lat}</TableCell>
                  <TableCell>{row.long}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.updated_at} </TableCell>
                  <TableCell align="center" sx={{ margin: "10px" }}>
                    <Button sx={{ color: "black" }}>
                      <EditIcon sx={{ color: "black" }} />
                    </Button>
                    <Button color="error">
                      <DeleteIcon color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Destination</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={newDestination.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={newDestination.description}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="province_id"
              name="province_id"
              label="Province ID"
              type="text"
              fullWidth
              value={newDestination.province_id}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="category_id"
              name="category_id"
              label="Category ID"
              type="text"
              fullWidth
              value={newDestination.category_id}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="lat"
              name="lat"
              label="Latitude"
              type="text"
              fullWidth
              value={newDestination.lat}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="long"
              name="long"
              label="Longitude"
              type="text"
              fullWidth
              value={newDestination.long}
              onChange={handleInputChange}
            />
            {/* Gray boxes for image upload */}
            <Typography>Upload Image</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="image1">
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#E0E0E0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Image 1
                </Box>
                <input
                  accept="image/*"
                  id="image1"
                  name="image1"
                  type="file"
                  style={{ display: "none" }}
                  // onChange={handleImageChange}
                />
              </label>
              <label htmlFor="image2">
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#E0E0E0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Image 2
                </Box>
                <input
                  accept="image/*"
                  id="image2"
                  name="image2"
                  type="file"
                  style={{ display: "none" }}
                  // onChange={handleImageChange}
                />
              </label>
              <label htmlFor="image3">
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#E0E0E0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Image 3
                </Box>
                <input
                  accept="image/*"
                  id="image3"
                  name="image3"
                  type="file"
                  style={{ display: "none" }}
                  // onChange={handleImageChange}
                />
              </label>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddDestination} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
