import { useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const SelectCurrency = ({ selectedCurrency, setSelectedCurrency }) => {
  return (
    <FormControl sx={{ minWidth: 120, color: "primary.contrastText" }}>
      <Select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
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
  );
};

export default SelectCurrency;
