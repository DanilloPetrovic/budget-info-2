import React from "react";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategory, createIncome } from "../../pages/Home/HomeFunctions";
import { getUser } from "../../firebase";
import Button from "@mui/material/Button";

const AddIncome = ({ user }) => {
  const categories = useSelector((state) => state.user.incomeCategories);

  const formik = useFormik({
    initialValues: {
      category: "",
      amount: "",
      message: "",
      currency: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      amount: Yup.number().required("Amount is required"),
      message: Yup.string()
        .required("Message is required")
        .max(200, "Max 200 characters"),
      currency: Yup.string().required("Currency is required"),
    }),
    onSubmit: (values) => {
      //   createIncome(user, values);
      //   alert(`Category ${values.category} created`);
    },
  });

  //   zavrsiti add income

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        Income
      </Typography>

      {categories.length > 0 ? (
        <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
          <Select
            value={categories.length > 0 ? categories[0] : "None"}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{
              color: "primary.contrastText",
              bgcolor: "background.paper",
            }}
          >
            {categories.length > 0
              ? null
              : categories.map((category) => (
                  <MenuItem
                    value={category}
                    sx={{
                      color: "primary.contrastText",
                      bgcolor: "background.paper",
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      ) : null}
    </Box>
  );
};

export default AddIncome;
