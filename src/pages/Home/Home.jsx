import React from "react";
import "./Home.css";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  return <div>Home</div>;
};

export default Home;
