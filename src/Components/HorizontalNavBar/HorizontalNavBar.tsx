import { Toolbar, Typography, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box sx={{ margin:"20px"} }>
      <Box
        sx={{
          bgcolor: "#df6e1a",
          margin: "10px 10px 20px 10px",
          borderRadius: "14px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
}
