import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Notes = ({ user }) => {
  const navigate = useNavigate();
  const notes = useSelector((state) => state.user.notes);

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
        Notes
      </Typography>
      {user.notes.length > 0 ? (
        <Typography
          sx={{
            textDecoration: "none",
            color: "primary.greyText",
            fontWeight: "light",
            cursor: "pointer",
            fontSize: "1.8rem",
          }}
          variant="h6"
        >
          {user?.notes.sort((a, b) => b.createdAt - a.createdAt)[0].noteContent}
        </Typography>
      ) : (
        <Button
          variant="contained"
          sx={{
            textDecoration: "none",
            color: "primary.greyText",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "20px",
          }}
          onClick={() => navigate("/add-note")}
        >
          Add a note...
        </Button>
      )}
    </Box>
  );
};

export default Notes;
