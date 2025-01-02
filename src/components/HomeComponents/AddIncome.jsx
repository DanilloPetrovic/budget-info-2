import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createIncomeCategory } from "../../pages/Home/HomeFunctions";

const AddIncome = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = useSelector((state) => state.user.incomeCategories);

  const formik = useFormik({
    initialValues: {
      id: crypto.randomUUID(),
      category: "",
      amount: "",
      message: "",
      currency: "",
      date: new Date().toISOString(),
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      amount: Yup.number().required("Amount is required"),
      message: Yup.string()
        .required("Message is required")
        .max(200, "Max 200 characters"),
      currency: Yup.string().required("Currency is required"),
    }),
    onSubmit: (values) => {},
  });

  const newCategoryFormik = useFormik({
    initialValues: {
      name: "",
      id: crypto.randomUUID(),
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      id: Yup.string().required(),
    }),
    onSubmit: (values) => {
      createIncomeCategory(user, values);
      setIsOpen(false);
      newCategoryFormik.resetForm();
    },
  });

  console.log(categories);

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        Income
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {categories.length > 0 ? (
          <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
            <Select
              value={formik.values.category}
              onChange={formik.handleChange}
              name="category"
              sx={{
                color: "primary.contrastText",
                bgcolor: "background.paper",
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.name}
                  sx={{
                    color: "primary.contrastText",
                    bgcolor: "background.paper",
                  }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
        >
          Add category
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <form onSubmit={newCategoryFormik.handleSubmit} sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                bgcolor: "background.paper",
                color: "primary.contrastText",
              }}
            >
              <Typography variant="h6">Add new category</Typography>
              <TextField
                label="Name"
                name="name"
                value={newCategoryFormik.values.name}
                onChange={newCategoryFormik.handleChange}
                error={
                  newCategoryFormik.touched.name &&
                  !!newCategoryFormik.errors.name
                }
                helperText={newCategoryFormik.errors.name}
                sx={{
                  color: "primary.contrastText",
                  "& .MuiInputLabel-root": {
                    color: "primary.contrastText",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "primary.contrastText",
                    "& fieldset": {
                      borderColor: "background.default",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "primary.contrastText",
                  },
                }}
              />
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </form>
        </Modal>
      </Box>
    </Box>
  );
};

export default AddIncome;
