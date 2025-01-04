import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { convertTime } from "./ToDoFunctions";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { CompleteTask, NotCompleteTask, DeleteTask } from "./ToDoFunctions";

const ToDoList = ({ user, toDoList }) => {
  const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Typography
          variant="h4"
          sx={{ color: "primary.contrastText", textAlign: "center" }}
        >
          Incompleted
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {toDoList.filter((todo) => !todo.isDone).length > 0 ? (
            toDoList
              .filter((todo) => !todo.isDone)
              .sort(sortByDate)
              .map(
                (todo) =>
                  !todo.isDone && (
                    <Grid item xs={12}>
                      <Card
                        key={todo.id}
                        sx={{ width: "100%", marginBottom: "20px" }}
                      >
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
                            {todo.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "primary.greyText",
                              fontSize: "1.4rem",
                              fontWeight: "light",
                            }}
                          >
                            {todo.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "primary.greyText",
                              fontSize: "1rem",
                              fontWeight: "light",
                            }}
                          >
                            {convertTime(todo.date)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            sx={{ fontSize: "1rem" }}
                            onClick={() => CompleteTask(todo.id, user)}
                          >
                            Complete
                          </Button>
                          <Button
                            size="small"
                            sx={{ fontSize: "1rem" }}
                            onClick={() => DeleteTask(todo.id, user)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
              )
          ) : (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography
                sx={{
                  color: "primary.greyText",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                No incompleted tasks yet
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Typography
          variant="h4"
          sx={{ color: "primary.contrastText", textAlign: "center" }}
        >
          Completed
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {toDoList.filter((todo) => todo.isDone).length > 0 ? (
            toDoList
              .filter((todo) => todo.isDone)
              .sort(sortByDate)
              .map(
                (todo) =>
                  todo.isDone && (
                    <Grid item xs={12}>
                      <Card
                        key={todo.id}
                        sx={{ width: "100%", marginBottom: "20px" }}
                      >
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
                            {todo.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "primary.greyText",
                              fontSize: "1.4rem",
                              fontWeight: "light",
                            }}
                          >
                            {todo.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "primary.greyText",
                              fontSize: "1rem",
                              fontWeight: "light",
                            }}
                          >
                            {convertTime(todo.date)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            sx={{ fontSize: "1rem" }}
                            onClick={() => NotCompleteTask(todo.id, user)}
                          >
                            Not complete
                          </Button>
                          <Button
                            size="small"
                            sx={{ fontSize: "1rem" }}
                            onClick={() => DeleteTask(todo.id, user)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
              )
          ) : (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography
                sx={{
                  color: "primary.greyText",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                No completed tasks yet
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ToDoList;
