import React from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  console.log("nesto");

  return (
    <Box sx={{ bgcolor: "background.default", heigh: "100vh", width: "100%" }}>
      <Sidebar />
    </Box>
  );
};

export default Home;
