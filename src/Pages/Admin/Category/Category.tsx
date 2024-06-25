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
  styled,
  tableCellClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";

interface Destination {
  id: number;
  name: string;
}

const StyledTableCell = styled(TableCell)(() => ({
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
      const confirmed = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!confirmed) return;

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
        <Box sx={{ flex: "10%", bgcolor: "white", padding: "0  25px 0 0" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {destinations.map((destination) => (
                  <StyledTableRow key={destination.id}>
                    <StyledTableCell>{destination.id}</StyledTableCell>
                    <StyledTableCell>{destination.name}</StyledTableCell>
                    <StyledTableCell align="center" sx={{ margin: "10px" }}>
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
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <TextField
            value={newDestinationName}
            onChange={(e) => setNewDestinationName(e.target.value)}
            label="New Category Name"
          />
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
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
