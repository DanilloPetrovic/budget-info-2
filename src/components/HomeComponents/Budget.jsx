import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { getBudget } from "../../pages/Home/HomeFunctions";
import SelectCurrency from "../SelectCurrency";

const Budget = ({ user }) => {
  const [currency, setCurrency] = useState("RSD");

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
            Budget
          </Typography>

          <SelectCurrency
            selectedCurrency={currency}
            setSelectedCurrency={setCurrency}
          />
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "primary.greyText",
              fontSize: "1.5rem",
              fontWeight: "light",
              marginTop: "10px",
            }}
          >
            All time income: {user && getBudget(user, currency).income}{" "}
            {currency === "RSD" ? "din" : currency === "EUR" ? "€" : "$"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.greyText",
              fontSize: "1.5rem",
              fontWeight: "light",
            }}
          >
            All time expenses: {user && getBudget(user, currency).expenses}{" "}
            {currency === "RSD" ? "din" : currency === "EUR" ? "€" : "$"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.greyText",
              fontSize: "1.5rem",
              fontWeight: "light",
            }}
          >
            All time balance: {user && getBudget(user, currency).balance}{" "}
            {currency === "RSD" ? "din" : currency === "EUR" ? "€" : "$"}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Budget;
