import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";
import AddDestinationDialog from "./CreateDestination";
import UpdateDestinationDialog from "./UpadateDestination"; // Update import

interface Destination {
  id: number;
  name: string;
  description: string;
  province_id: string;
  category_id: string;
  lat: string;
  long: string;
  image1: string;
  image2: string;
  image3: string;
  created_at: string;
  updated_at: string;
}

export default function AdminTable() {
  const [data, setData] = useState<Destination[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    number | null
  >(null); // Track selected destination ID
  const [newDestination] = useState({
    name: "",
    description: "",
    province_id: "",
    category_id: "",
    lat: "",
    long: "",
    image: null,
  });

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
    setOpenDialog(true);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewDestination({
  //     ...newDestination,
  //     [name]: value,
  //   });
  // };

  const handleAddDestination = () => {
    console.log("New Destination:", newDestination);
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
                    <img
                      src={row.image1}
                      alt="Destination"
                      style={{ width: "100px" }}
                    />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.province_id}</TableCell>
                  <TableCell>{row.category_id}</TableCell>
                  <TableCell>
                    {row.lat}, {row.long}
                  </TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.updated_at}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditDestination(row.id)}>
                      <EditIcon />
                    </Button>
                    <Button>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddDestinationDialog
        open={openDialog && !selectedDestinationId}
        onClose={handleCloseDialog}
        onAdd={handleAddDestination}
      />
      <UpdateDestinationDialog
        open={openDialog && selectedDestinationId !== null}
        onClose={handleCloseDialog}
        onAdd={handleAddDestination}
        id={selectedDestinationId || 0}
      />
    </>
  );
}
