import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import config from "../../../Api/config";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  id: number;
}

interface Destination {
  name: string;
  description: string;
  province_id: number;
  category_id: number;
  lat: string;
  long: string;
  image1: string | null; // Change type to string | null
}

const UpdateDestination: React.FC<Props> = ({ open, onClose, onAdd, id }) => {
  const [destination, setDestination] = useState<Destination>({
    name: "",
    description: "",
    province_id: 0,
    category_id: 0,
    lat: "",
    long: "",
    image1: null, // Initialize image1 as null
  });

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/admin/destination/${id}`, {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          setDestination(jsonData.data); // Set destination data
        } else {
          console.log("Failed to fetch destination:", response.status);
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    };

    if (open && id) {
      fetchDestination();
    }
  }, [open, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const updateDestination = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/destination/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify(destination),
      });

      if (response.ok) {
        onAdd();
      } else {
        console.log("Failed to update destination:", response.status);
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Destination</DialogTitle>
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
            value={destination.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={destination.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="province_id"
            name="province_id"
            label="Province ID"
            type="number"
            fullWidth
            value={destination.province_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="category_id"
            name="category_id"
            label="Category ID"
            type="number"
            fullWidth
            value={destination.category_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="lat"
            name="lat"
            label="Latitude"
            type="text"
            fullWidth
            value={destination.lat}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="long"
            name="long"
            label="Longitude"
            type="text"
            fullWidth
            value={destination.long}
            onChange={handleChange}
          />
          <Typography>Upload Image</Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={updateDestination} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDestination;
