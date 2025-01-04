import React, { useState, useEffect } from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Budget from "../../components/HomeComponents/Budget";
import Notes from "../../components/HomeComponents/Notes";
import AddIncome from "../../components/HomeComponents/AddIncome";
import ToDoHome from "../../components/ToDoComponents/ToDoHome";
import Loading from "../../components/Loading";
import { getUser } from "../../firebase";

const Home = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (token && (!user.uid || !user.username)) {
      getUser();
    }
  }, [token, user]);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  if (user.uid === null) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        maxHeight: "100vh",
        width: "100%",
        display: "flex",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Sidebar />
      </Box>

      <Box
        sx={{
          width: "80%",
          maxHeight: "100vh",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Box sx={{ width: "50%", height: "100vh", marginTop: "100px" }}>
          <Typography
            variant="h3"
            sx={{ color: "primary.contrastText", fontWeight: "bold", mb: 4 }}
          >
            Home
          </Typography>

          <Budget user={user} />

          <Notes user={user} />

          <AddIncome user={user} />
        </Box>
        <Box sx={{ width: "50%", height: "100vh", marginTop: "100px" }}>
          <ToDoHome user={user} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
