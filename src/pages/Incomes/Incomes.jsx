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

const Incomes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useSelector((state) => state.user.incomeCategories);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

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

  const filteredIncomes = user?.income?.filter((income) =>
    !selectedCategory || selectedCategory === "All"
      ? true
      : income.category === selectedCategory
  );

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
          sx={{ color: "primary.contrastText", fontWeight: "bold", mb: 4 }}
        >
          Incomes
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: "50px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "25%" }}
              onClick={() => setIsOpen(true)}
            >
              Add income
            </Button>
          </Box>
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
          <Typography
            variant="h4"
            sx={{ color: "primary.contrastText", mt: 4 }}
          >
            Total income ({selectedCategory || "All"}): dodati ukupan priliv
          </Typography>

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
