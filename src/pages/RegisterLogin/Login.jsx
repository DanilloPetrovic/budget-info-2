import "./RegisterLogin.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../../photos/budgetInfoLogo.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Box
          component="img"
          src={appLogo}
          width={{ lg: "100px", xs: "80px" }}
          height={{ lg: "100px", xs: "80px" }}
          sx={{
            borderRadius: "100%",
          }}
        />
        <Typography
          variant="h2"
          fontSize={{ md: "52px", sm: "48px", xs: "38px" }}
          sx={{ color: "primary.contrastText", fontWeight: "500" }}
        >
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
          width: { lg: "50%", md: "75%", sm: "90%", xs: "90%" },
        }}
      >
        <TextField
          id="outlined-email"
          label="Email"
          variant="filled"
          sx={{
            backgroundColor: "background.paper",
            "& .MuiInputLabel-root": {
              color: "primary.contrastText",
            },
            "& input": {
              color: "primary.contrastText",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "background.paper",
              },
              "&:hover fieldset": {
                borderColor: "background.inputHover",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
        <TextField
          id="outlined-password"
          label="Password"
          variant="filled"
          sx={{
            backgroundColor: "background.paper",
            "& .MuiInputLabel-root": {
              color: "primary.contrastText",
            },
            "& input": {
              color: "primary.contrastText",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "background.paper",
              },
              "&:hover fieldset": {
                borderColor: "background.inputHover",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          type="password"
        />
      </Box>

      <Typography
        onClick={() => navigate("/register")}
        sx={{
          marginTop: "20px",
          fontWeight: "500",
          cursor: "pointer",
          color: "primary.contrastText",
          ":hover": { textDecoration: "underline" },
        }}
      >
        You don't have an account?
      </Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          fontSize: "18px",
          bgcolor: "primary.main",
          fontWeight: "500",
          ":hover": { bgcolor: "primary.dark" },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
