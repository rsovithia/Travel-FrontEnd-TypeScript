import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import config from "../../../Api/config";

interface Destination {
  id: number;
  name: string;
  image1: string;
  image2: string;
  image3: string;
  description: string;
  province_id: number;
  lat: string;
  long: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  user_id: number;
  status: string;
}

const fileUrl = config.fileUrl;

const truncate = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

export default function DashboardRequest() {
  const [data, setData] = useState<Destination[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/admin/destinations/show_pending`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${config.accessToken}`,
            },
          }
        );
        const result = await response.json();
        setData(result.data); // Assuming the API returns an object with a "data" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`${config.apiUrl}/admin/destinations/${id}/approved`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      setOpen(false);
      setSelectedDestination(null);
      setData(data.filter((destination) => destination.id !== id)); // Remove approved destination from list
    } catch (error) {
      console.error("Error approving destination:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await fetch(`${config.apiUrl}/admin/destinations/${id}/rejected`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });
      setOpen(false);
      setSelectedDestination(null);
      setData(data.filter((destination) => destination.id !== id)); // Remove rejected destination from list
    } catch (error) {
      console.error("Error rejecting destination:", error);
    }
  };

  const handleClickOpen = (destination: Destination) => {
    setSelectedDestination(destination);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDestination(null);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Pending Destinations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Province ID</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((destination) => (
              <TableRow
                key={destination.id}
                onClick={() => handleClickOpen(destination)}
                sx={{ cursor: "pointer", height: "40px" }}
              >
                <TableCell>{destination.id}</TableCell>
                <TableCell>{destination.name}</TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <img
                    src={fileUrl + destination.image1}
                    alt={`${destination.name} image1`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                  <img
                    src={fileUrl + destination.image2}
                    alt={`${destination.name} image2`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                  <img
                    src={fileUrl + destination.image3}
                    alt={`${destination.name} image3`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                </TableCell>
                <TableCell>{truncate(destination.description, 40)}</TableCell>
                <TableCell>{destination.province_id}</TableCell>
                <TableCell>{destination.lat}</TableCell>
                <TableCell>{destination.long}</TableCell>
                <TableCell>
                  {new Date(destination.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(destination.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{destination.category_id}</TableCell>
                <TableCell>{destination.user_id}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor: "red",
                      padding: "6px",

                      borderRadius: "14px",
                    }}
                  >
                    {" "}
                    {destination.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Destination Details</DialogTitle>
        <DialogContent>
          {selectedDestination && (
            <>
              <DialogContentText>
                ID: {selectedDestination.id}
              </DialogContentText>
              <DialogContentText>
                Name: {selectedDestination.name}
              </DialogContentText>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <img
                  src={fileUrl + selectedDestination.image1}
                  alt={`${selectedDestination.name} image1`}
                  style={{ width: "50px", height: "50px" }}
                />
                <img
                  src={fileUrl + selectedDestination.image2}
                  alt={`${selectedDestination.name} image2`}
                  style={{ width: "50px" }}
                />
                <img
                  src={fileUrl + selectedDestination.image3}
                  alt={`${selectedDestination.name} image3`}
                  style={{ width: "50px" }}
                />
              </Box>
              <DialogContentText>
                Description: {truncate(selectedDestination.description, 50)}
              </DialogContentText>
              <DialogContentText>
                Province ID: {selectedDestination.province_id}
              </DialogContentText>
              <DialogContentText>
                Latitude: {selectedDestination.lat}
              </DialogContentText>
              <DialogContentText>
                Longitude: {selectedDestination.long}
              </DialogContentText>
              <DialogContentText>
                Created At:{" "}
                {new Date(selectedDestination.created_at).toLocaleDateString()}
              </DialogContentText>
              <DialogContentText>
                Updated At:{" "}
                {new Date(selectedDestination.updated_at).toLocaleDateString()}
              </DialogContentText>
              <DialogContentText>
                Category ID: {selectedDestination.category_id}
              </DialogContentText>
              <DialogContentText>
                User ID: {selectedDestination.user_id}
              </DialogContentText>
              <DialogContentText>
                Status: {selectedDestination.status}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {selectedDestination && (
            <>
              <Button
                onClick={() => handleApprove(selectedDestination.id)}
                color="primary"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleReject(selectedDestination.id)}
                color="secondary"
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
