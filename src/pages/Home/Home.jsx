import React from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  return (
    <Box sx={{ bgcolor: "background.default", heigh: "100vh", width: "100%" }}>
      <Box sx={{ width: "20%" }}>
        <Sidebar />
      </Box>
    </Box>
  );
};

export default Home;
