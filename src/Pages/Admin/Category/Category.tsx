import { useState } from "react";
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
  {
    id: 3,
    name: "Destination 4",
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

export default function AdminTable() {
  const [openDialog, setOpenDialog] = useState(false);
  // const [editingDestination, setEditingDestination] = useState(null); // State for tracking the destination being edited
  const [newDestination, setNewDestination] = useState({
    name: "",
    description: "",
    province_id: "",
    category_id: "",
    lat: "",
    long: "",
  });

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleEditDestination = (destination: React.SetStateAction<null>) => {
  //   setEditingDestination(destination); // Set the destination being edited
  //   setOpenDialog(true); // Open the dialog
  // };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewDestination({
      ...newDestination,
      [name]: value,
    });
  };

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
        <Typography>Category</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: "1",
          bgcolor: "white",
          padding: "25px",
          justifyContent: "space-between",
        }}
      >
        {/* First box */}
        <Box sx={{ flex: "10%", bgcolor: "white", padding: "25px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center" sx={{ margin: "10px" }}>
                      <Button
                        sx={{ color: "black" }}
                        // onClick={() => handleEditDestination(row)}
                      >
                        {/* Call handleEditDestination with the current destination */}
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

        {/* Second box */}
        <Box sx={{ flex: "10%", display: "flex", flexDirection: "row" }}>
          <Box sx={{ padding: " 0 0px", width: "400px" }}>
            <Typography>Create Category</Typography>
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

            <Button variant="contained">Add New</Button>
          </Box>
        </Box>
      </Box>

      {/* Dialog for editing destination */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Destination</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            // value={editingDestination ? editingDestination?.name : ""}
            onChange={handleInputChange}
          />
          {/* Add other fields for editing */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddDestination} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
