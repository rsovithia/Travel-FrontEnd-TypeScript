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
}

interface Destination {
  name: string;
  description: string;
  province_id: number;
  category_id: number;
  lat: string;
  long: string;
  image1: string;
}

const AddDestinationDialog: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [newDestination, setNewDestination] = useState<Destination>({
    name: "",
    description: "",
    province_id: 0,
    category_id: 0,
    lat: "",
    long: "",
    image1: "",
  });

  useEffect(() => {
    // Reset form data when dialog is opened
    if (open) {
      setNewDestination({
        name: "",
        description: "",
        province_id: 0,
        category_id: 0,
        lat: "",
        long: "",
        image1: "",
      });
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewDestination((prevDestination) => ({
  //         ...prevDestination,
  //         image1: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const createDestination = async () => {
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
        onAdd();
      } else {
        console.log("Failed to create destination:", response.status);
      }
    } catch (error) {
      console.error("Error creating destination:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Destination</DialogTitle>
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
          <Typography>Upload Image</Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={createDestination} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDestinationDialog;
