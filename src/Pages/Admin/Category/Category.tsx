import { useState, useEffect } from "react";
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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";

interface Destination {
  id: number;
  name: string;
}

export default function AdminTable() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newDestinationName, setNewDestinationName] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setDestinations(jsonData.data);
      } else {
        console.log("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createData = async (newName: string) => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        setDestinations([...destinations, jsonData.data]);
      } else {
        console.log("Failed to create data:", response.status);
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const updateData = async (id: number, newName: string) => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        setDestinations(
          destinations.map((dest) =>
            dest.id === id ? { ...dest, name: newName } : dest
          )
        );
      } else {
        console.log("Failed to update data:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const removeData = async (id: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        setDestinations(destinations.filter((dest) => dest.id !== id));
      } else {
        console.log("Failed to delete data:", response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id: number, name: string) => {
    setSelectedId(id);
    setEditName(name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveEdit = () => {
    if (editName.trim() !== "") {
      updateData(selectedId!, editName);
      setOpenDialog(false);
    }
  };

  const handleCreate = () => {
    if (newDestinationName.trim() !== "") {
      createData(newDestinationName);
      setNewDestinationName("");
    }
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
                {destinations.map((destination) => (
                  <TableRow key={destination.id}>
                    <TableCell>{destination.id}</TableCell>
                    <TableCell>{destination.name}</TableCell>
                    <TableCell align="center" sx={{ margin: "10px" }}>
                      <Button
                        onClick={() =>
                          handleEdit(destination.id, destination.name)
                        }
                        sx={{ color: "black" }}
                      >
                        <EditIcon sx={{ color: "black" }} />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => removeData(destination.id)}
                      >
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
          <TextField
            value={newDestinationName}
            onChange={(e) => setNewDestinationName(e.target.value)}
            label="New Destination Name"
          />
          <Button onClick={handleCreate}>Create </Button>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Category Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
