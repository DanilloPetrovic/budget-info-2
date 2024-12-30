import "./RegisterLogin.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../../photos/budgetInfoLogo.png";
import { registerUser } from "./RegisterLoginFunctions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Loading from "../../components/Loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimum password length is 6 characters")
        .max(20, "Maximum password length is 20 characters"),
    }),

    onSubmit: (values) => {
      registerUser(
        values.email,
        values.password,
        values.username,
        navigate,
        setLoading
      );
    },
  });

  if (loading) {
    return <Loading />;
  }

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
          Register
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
          width: { lg: "50%", md: "75%", sm: "90%", xs: "90%" },
        }}
      >
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="filled"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          id="email"
          name="email"
          label="Email"
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="filled"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
        <Typography
          onClick={() => navigate("/login")}
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "500",
            cursor: "pointer",
            color: "primary.contrastText",
            ":hover": { textDecoration: "underline" },
          }}
        >
          You already have an account?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              fontSize: "18px",
              bgcolor: "primary.main",
              fontWeight: "500",
              ":hover": { bgcolor: "primary.dark" },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
