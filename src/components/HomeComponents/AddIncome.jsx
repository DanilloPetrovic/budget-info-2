import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CreateIncomeCategoryModal from "./CreateIncomeCategoryModal";
import { createIncome } from "../../pages/Home/HomeFunctions";

const AddIncome = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("RSD");

  const categories = useSelector((state) => state.user.incomeCategories);

  useEffect(() => {
    if (categories.length > 0 && !formik.values.category) {
      formik.setFieldValue("category", categories[0].name);
    }
  }, [categories]);

  const formik = useFormik({
    initialValues: {
      id: crypto.randomUUID(),
      amount: "",
      message: "",
      currency: "RSD",
      date: new Date().toISOString(),
      category: categories.length > 0 ? categories[0].name : "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Kategorija je obavezna"),
      amount: Yup.number()
        .required("Iznos je obavezan")
        .positive("Iznos mora biti pozitivan")
        .typeError("Mora biti broj"),
      message: Yup.string()
        .required("Poruka je obavezna")
        .max(200, "Maksimalno 200 karaktera"),
      currency: Yup.string().required("Valuta je obavezna"),
    }),
    onSubmit: (values, { resetForm }) => {
      createIncome(user, values);

      const newInitialValues = {
        id: crypto.randomUUID(),
        amount: "",
        message: "",
        currency: "RSD",
        date: new Date().toISOString(),
        category: categories.length > 0 ? categories[0].name : "",
      };
      resetForm({ values: newInitialValues });
    },
  });

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        Incomes
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {categories.length > 0 ? (
            <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
              <Select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
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
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <TextField
            variant="filled"
            label="Amount"
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
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

          <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
            <Select
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currency && Boolean(formik.errors.currency)}
              sx={{
                color: "primary.contrastText",
                bgcolor: "background.paper",
              }}
            >
              <MenuItem
                value="RSD"
                sx={{
                  color: "primary.contrastText",
                  bgcolor: "background.paper",
                }}
              >
                RSD
              </MenuItem>
              <MenuItem
                value="EUR"
                sx={{
                  color: "primary.contrastText",
                  bgcolor: "background.paper",
                }}
              >
                EUR
              </MenuItem>
              <MenuItem
                value="USD"
                sx={{
                  color: "primary.contrastText",
                  bgcolor: "background.paper",
                }}
              >
                USD
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.contrastText",
            },
            "& .MuiOutlinedInput-root": {
              color: "primary.contrastText",
              "& fieldset": {
                borderColor: "background.paper",
              },
            },
            "& .MuiFormHelperText-root": {
              color: "primary.contrastText",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
        >
          Add income
        </Button>
      </Box>

      <CreateIncomeCategoryModal
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  );
};

export default AddIncome;
