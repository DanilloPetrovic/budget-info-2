import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const IncomeFilters = ({
  user,
  searchInputValue,
  setSearchInputValue,
  selectedDate,
  setSelectedDate,
}) => {
  const dateFilters = [
    { message: "All time", value: "alltime" },
    { message: "This week", value: "thisweek" },
    { message: "This month", value: "thismonth" },
    { message: "This year", value: "thisyear" },
  ];

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate("alltime"); // Postavljanje podrazumevane vrednosti
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <Box sx={{ marginTop: "20px" }}>
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

        <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
          <Select
            value={selectedDate || "alltime"} // Ako selectedDate nije definisan, podrazumevano je "alltime"
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{
              color: "primary.contrastText",
              bgcolor: "background.paper",
            }}
          >
            {dateFilters.map((filter) => (
              <MenuItem
                key={filter.value}
                value={filter.value}
                sx={{
                  color: "primary.contrastText",
                  bgcolor: "background.paper",
                }}
              >
                {filter.message}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default IncomeFilters;
