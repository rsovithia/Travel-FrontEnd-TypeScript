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
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  styled,
  tableCellClasses,
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

export default function DashboardRequest() {
  const [data, setData] = useState<Destination[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching pending destinations...");
        const response = await fetch(
          `${config.apiUrl}/admin/destinations/show_pending`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${config.accessToken}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Pending destinations fetched successfully:", result);
          setData(result.data); // Assuming the API returns an object with a "data" property
        } else {
          console.error("Failed to fetch pending destinations:", response.status);
        }
      } catch (error) {
        console.error("Error fetching pending destinations:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      console.log(`Approving destination with ID: ${id}...`);
      const response = await fetch(`${config.apiUrl}/admin/destinations/${id}/approved`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        console.log(`Destination with ID: ${id} approved successfully`);
        setOpen(false);
        setSelectedDestination(null);
        setData(data.filter((destination) => destination.id !== id)); // Remove approved destination from list
      } else {
        console.error("Failed to approve destination:", response.status);
      }
    } catch (error) {
      console.error("Error approving destination:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      console.log(`Rejecting destination with ID: ${id}...`);
      const response = await fetch(`${config.apiUrl}/admin/destinations/${id}/rejected`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      });

      if (response.ok) {
        console.log(`Destination with ID: ${id} rejected successfully`);
        setOpen(false);
        setSelectedDestination(null);
        setData(data.filter((destination) => destination.id !== id)); // Remove rejected destination from list
      } else {
        console.error("Failed to reject destination:", response.status);
      }
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
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Province ID</StyledTableCell>
              <StyledTableCell>Latitude</StyledTableCell>
              <StyledTableCell>Longitude</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Updated At</StyledTableCell>
              <StyledTableCell>Category ID</StyledTableCell>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((destination) => (
              <StyledTableRow
                key={destination.id}
                onClick={() => handleClickOpen(destination)}
                sx={{ cursor: "pointer", height: "40px" }}
              >
                <StyledTableCell>{destination.id}</StyledTableCell>
                <StyledTableCell>{destination.name}</StyledTableCell>
                <StyledTableCell sx={{ display: "flex", gap: 1 }}>
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
                </StyledTableCell>
                <StyledTableCell>{truncate(destination.description, 40)}</StyledTableCell>
                <StyledTableCell>{destination.province_id}</StyledTableCell>
                <StyledTableCell>{destination.lat}</StyledTableCell>
                <StyledTableCell>{destination.long}</StyledTableCell>
                <StyledTableCell>
                  {new Date(destination.created_at).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(destination.updated_at).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{destination.category_id}</StyledTableCell>
                <StyledTableCell>{destination.user_id}</StyledTableCell>
                <StyledTableCell>
                  <Box
                    sx={{
                      bgcolor: "red",
                      padding: "6px",
                      borderRadius: "14px",
                    }}
                  >
                    {destination.status}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
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
