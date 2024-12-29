import "./RegisterLogin.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../../photos/budgetInfoLogo.png";

const Register = () => {
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
          sx={{ width: "100px", height: "100px", borderRadius: "100%" }}
        />
        <Typography
          variant="h2"
          sx={{ color: "primary.contrastText", fontWeight: "500" }}
        >
          Register
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
          width: "50%",
        }}
      >
        <TextField
          id="outlined-username"
          label="Username"
          variant="filled"
          sx={{
            backgroundColor: "background.paper",
            "& .MuiFilledInput-root": {
              backgroundColor: "background.paper",
            },
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
        />
      </Box>

      <Typography
        onClick={() => navigate("/login")}
        sx={{
          marginTop: "20px",
          fontWeight: "500",
          cursor: "pointer",
          color: "primary.contrastText",
          ":hover": { textDecoration: "underline" },
        }}
      >
        You already have an account?
      </Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          width: "10%",
          fontSize: "18px",
          bgcolor: "primary.main",
          fontWeight: "500",
          ":hover": { bgcolor: "primary.dark" },
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
