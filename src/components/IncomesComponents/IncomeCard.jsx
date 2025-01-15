import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { convertTime } from "../../pages/AddToDo/ToDoFunctions";

const IncomeCard = ({ user, income }) => {
  return (
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
  );
};

export default IncomeCard;
