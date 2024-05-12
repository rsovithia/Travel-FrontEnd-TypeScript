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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";

interface Destination {
  id?: number;
  name: string;
  description: string;
  province_id: number;
  category_id: number;
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
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    number | null
  >(null);
  const [newDestination, setNewDestination] = useState<Destination>({
    name: "",
    description: "",
    province_id: 0,
    category_id: 0,
    lat: "",
    long: "",
    image1: "",
    image2: "",
    image3: "",
    created_at: "",
    updated_at: "",
  });

  const fileUrl = config.fileUrl ;

  useEffect(() => {
    getData();
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
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDestinationId(null);
  };

  const handleEditDestination = (id: number) => {
    setSelectedDestinationId(id);
    handleGetIdFerDestination(id);
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
    imageField: keyof Destination
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDestination((prevDestination) => ({
          ...prevDestination,
          [imageField]: reader.result as string,
        }));
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

      <Box sx={{ bgcolor: "white", padding: "25px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Province ID</TableCell>
                <TableCell>Category ID</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {row.image1 && (
                        <img
                          src={row.image1}
                          alt="Destination"
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                      )}
                      {row.image2 && (
                        <img
                          src={row.image2}
                          alt="Destination"
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                      )}
                      {row.image3 && (
                        <img
                          src={row.image3}
                          alt="Destination"
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.province_id}</TableCell>
                  <TableCell>{row.category_id}</TableCell>
                  <TableCell>
                    {row.lat}, {row.long}
                  </TableCell>
                  <TableCell>
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(row.updated_at).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => row.id && handleEditDestination(row.id)}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      onClick={() => row.id && handleRemoveDestination(row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedDestinationId ? "Edit Destination" : "Add New Destination"}
        </DialogTitle>
        <DialogContent>
          <form>
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
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={newDestination.description}
              onChange={handleChange}
            />
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
            <TextField
              margin="dense"
              id="category_id"
              name="category_id"
              label="Category ID"
              type="number"
              fullWidth
              value={newDestination.category_id}
              onChange={handleChange}
            />
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
            {/* Image upload fields */}
            <Typography>Upload Image 1</Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e, "image1")
              }
            />
            <Typography>Upload Image 2</Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e, "image2")
              }
            />
            <Typography>Upload Image 3</Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleImageChange(e, "image3")
              }
            />
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
          >
            {selectedDestinationId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminTable;
