import { Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#df6e1a",
          margin: "10px 10px 20px 10px",
          borderRadius: "14px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Der Leng Dashboard
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
}
