import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";
import { getUser } from "../../firebase";
import { convertTime } from "../AddToDo/ToDoFunctions";

const Incomes = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (token && (!user.uid || !user.username)) {
      getUser();
    }
  }, [token, user]);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  if (user.uid === null) {
    return <Loading />;
  }

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
              {user?.income.length > 0 ? (
                user.income.map((income) => (
                  <Grid item xs={12} sm={6} key={income.id}>
                    <Card sx={{ width: "100%", marginBottom: "20px" }}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{
                            color: "primary.contrastText",
                            marginBottom: "0px",
                          }}
                        >
                          {income.category}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.greyText",
                            fontSize: "1.4rem",
                            fontWeight: "light",
                          }}
                        >
                          {income.message}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.greyText",
                            fontSize: "1rem",
                            fontWeight: "light",
                          }}
                        >
                          {income.amount} {income.currency}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.greyText",
                            fontSize: "1rem",
                            fontWeight: "light",
                          }}
                        >
                          {convertTime(income.date)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h4">You have no incomes yet.</Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Incomes;
