import React from "react";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardActions } from "@mui/material";

const ToDoHome = ({ user }) => {
  const [todo, setTodo] = useState(user.toDo);

  const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);

  const getLatestUnfinishedTasks = () => {
    return todo
      .filter((task) => !task.isDone)
      .sort(sortByDate)
      .slice(0, 3);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "15px",
        padding: "20px",
        maxHeight: "50vh",
        overflowY: "scroll",
        width: "75%",
      }}
    >
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        To Do
      </Typography>

      <Box sx={{ my: 2 }}>
        {getLatestUnfinishedTasks().length > 0 ? (
          getLatestUnfinishedTasks().map((task) => (
            <Box
              key={task.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.card",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
                {task.title}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "primary.contrastText", mb: 1 }}>
            No incompleted tasks yet
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/todo")}
          sx={{ marginTop: "20px", width: "25%" }}
        >
          More
        </Button>
      </Box>
    </Box>
  );
};

export default ToDoHome;
