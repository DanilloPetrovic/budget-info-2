import React from "react";
import { Box, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress
        sx={{ color: "primary.main" }}
        size={80}
        thickness={6}
      />
    </Box>
  );
};

export default Loading;
