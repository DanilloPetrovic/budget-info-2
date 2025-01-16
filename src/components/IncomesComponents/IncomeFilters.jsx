import React, { useEffect, useState } from "react";
import { Box, Select, TextField, Typography } from "@mui/material";

const IncomeFilters = ({ user, searchInputValue, setSearchInputValue }) => {
  return (
    <Box
      sx={{
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        Filters
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <TextField
          label="Search by message"
          variant="filled"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
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
      </Box>
    </Box>
  );
};

export default IncomeFilters;
