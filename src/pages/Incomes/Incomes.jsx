import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";
import IncomeCard from "../../components/IncomesComponents/IncomeCard";
import { getUser } from "../../firebase";
import AllCategories from "../../components/IncomesComponents/AllCategories";
import CreateIncomeCategoryModal from "../../components/HomeComponents/CreateIncomeCategoryModal";
import { getTotalIncome } from "./IncomesFunctions";
import SelectCurrency from "../../components/SelectCurrency";
import IncomeModal from "../../components/IncomesComponents/IncomeModal";
import IncomeFilters from "../../components/IncomesComponents/IncomeFilters";

const Incomes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useSelector((state) => state.user.incomeCategories);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("RSD");
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    if (token && (!user.uid || !user.username)) {
      getUser();
    }
  }, [token, user]);

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory("All");
    }
  }, [selectedCategory]);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  if (user.uid === null) {
    return <Loading />;
  }

  const filteredIncomes = user?.income?.filter((income) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      income.category === selectedCategory;
    const matchesSearch = income.message
      .toLowerCase()
      .includes(searchInputValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        width: "100%",
        display: "flex",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "20%", height: "100vh" }}>
        <Sidebar />
      </Box>

      <Box
        sx={{
          width: "80%",
          padding: "50px",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "primary.contrastText", fontWeight: "bold" }}
        >
          Incomes
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenIncomeModal(true)}
          >
            Add income
          </Button>

          <IncomeModal
            user={user}
            isOpen={openIncomeModal}
            onClose={() => setOpenIncomeModal(false)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Add category
          </Button>

          <CreateIncomeCategoryModal
            user={user}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "20px",
              marginTop: "50px",
            }}
          >
            <FormControl
              sx={{
                minWidth: 120,
                color: "primary.contrastText",
                width: "25%",
              }}
            >
              <Select
                value={selectedCategory || "All"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  color: "primary.contrastText",
                  bgcolor: "background.paper",
                }}
              >
                <MenuItem
                  value="All"
                  sx={{
                    color: "primary.contrastText",
                    bgcolor: "background.paper",
                  }}
                >
                  All
                </MenuItem>
                {categories.length > 0
                  ? categories.map((category) => (
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
                    ))
                  : null}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              sx={{ width: "20%" }}
              onClick={() => setIsAllCategoriesOpen(true)}
            >
              See all categories
            </Button>

            <AllCategories
              user={user}
              isOpen={isAllCategoriesOpen}
              onClose={() => setIsAllCategoriesOpen(false)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "10px",
              alignItems: "center",
              mt: "50px",
            }}
          >
            <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
              Total income ({selectedCategory || "All"}):{" "}
              {getTotalIncome(user, filteredIncomes, selectedCurrency)}
              {selectedCurrency === "RSD"
                ? "din"
                : selectedCurrency === "EUR"
                ? "€"
                : "$"}
            </Typography>

            <SelectCurrency
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ color: "primary.contrastText", fontSize: "1rem" }}
          >
            (click on card to delete)
          </Typography>

          <IncomeFilters
            user={user}
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
          />

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                marginTop: "25px",
              }}
            >
              {filteredIncomes?.length > 0 ? (
                filteredIncomes.map((income) => (
                  <IncomeCard key={income.id} user={user} income={income} />
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "50px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "primary.contrastText",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    You have no incomes yet.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Incomes;
