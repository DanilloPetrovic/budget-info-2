import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getUser } from "../../firebase";
import { useEffect } from "react";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import ToDoModal from "../../components/ToDoComponents/ToDoModal";
import Loading from "../../components/Loading";
import ToDoList from "./ToDoList";

const ToDo = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          ToDo
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
              Add task
            </Button>
            <ToDoModal
              user={user}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <ToDoList user={user} toDoList={user.toDo} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ToDo;
