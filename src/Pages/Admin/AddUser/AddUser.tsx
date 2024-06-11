import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../Api/config";

interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function AdminTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    getDataUser();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/admin/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        getDataUser();
        handleCloseDialog();
      } else {
        console.log("Failed to add user:", response.status);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const getDataUser = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/user/all`, {
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

  const handleEditUser = (user: User) => {
    setUserData(user);
    handleOpenDialog();
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
        <Typography>Add User</Typography>
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
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ color: "black" }}
                      onClick={() => handleEditUser(row)}
                    >
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
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Phone Number"
              type="text"
              fullWidth
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button color="primary" onClick={handleAddUser}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
