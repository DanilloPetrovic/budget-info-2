import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createIncomeCategory } from "../../pages/Home/HomeFunctions";
import { Box, Typography, TextField, Button } from "@mui/material";
import Modal from "../Modal";

const CreateIncomeCategoryModal = ({ user, isOpen, setIsOpen }) => {
  const newCategoryFormik = useFormik({
    initialValues: {
      name: "",
      id: crypto.randomUUID(),
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Ime je obavezno"),
      id: Yup.string().required(),
    }),
    onSubmit: (values) => {
      createIncomeCategory(user, values);
      setIsOpen(false);
      newCategoryFormik.resetForm({
        values: {
          name: "",
          id: crypto.randomUUID(),
        },
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={newCategoryFormik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6">Add new category</Typography>
          <TextField
            label="Category name"
            name="name"
            value={newCategoryFormik.values.name}
            onChange={newCategoryFormik.handleChange}
            onBlur={newCategoryFormik.handleBlur}
            error={
              newCategoryFormik.touched.name &&
              Boolean(newCategoryFormik.errors.name)
            }
            helperText={
              newCategoryFormik.touched.name && newCategoryFormik.errors.name
            }
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
            Kreiraj
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateIncomeCategoryModal;
