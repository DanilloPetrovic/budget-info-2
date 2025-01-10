import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { deleteCategory } from "../../pages/Incomes/IncomesFunctions";

const AllCategories = ({ user, isOpen, onClose }) => {
  const categories = useSelector((state) => state.user.incomeCategories);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        All Categories
      </Typography>

      <Typography variant="p" sx={{ color: "primary.greyText" }}>
        (click on category to delete)
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          marginTop: "25px",
        }}
      >
        {categories?.map((category) => (
          <Grid item xs={12} md={6} lg={4} key={category.id}>
            <Box
              variant="body1"
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.main",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => deleteCategory(user, category)}
            >
              {category.name}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
};

export default AllCategories;
