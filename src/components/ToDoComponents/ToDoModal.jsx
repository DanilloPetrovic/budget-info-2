import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, TextField, Button } from "@mui/material";
import Modal from "../Modal";
import { addTask } from "../../pages/AddToDo/ToDoFunctions";

const ToDoModal = ({ user, isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().max(
        100,
        "Description must be less than 100 characters"
      ),
    }),
    onSubmit: (values) => {
      addTask(values, user);
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6">Add task</Typography>
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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

          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
            Add
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default ToDoModal;
