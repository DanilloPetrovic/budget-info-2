import "./RegisterLogin.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../../photos/budgetInfoLogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "./RegisterLoginFunctions";
import { useState } from "react";
import Loading from "../../components/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      loginUser(values.email, values.password, navigate, setLoading);
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
          Login
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
          onClick={() => navigate("/register")}
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "500",
            cursor: "pointer",
            color: "primary.contrastText",
            ":hover": { textDecoration: "underline" },
          }}
        >
          You don't have an account?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            onSubmit={formik.handleSubmit}
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
      </Box>
    </Box>
  );
};

export default Login;
