import { Toolbar, Typography, Box } from "@mui/material";
 
 
export default function Header() {
 
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
