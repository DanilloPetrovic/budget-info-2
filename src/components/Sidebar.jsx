import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DescriptionIcon from "@mui/icons-material/Description";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const upper = [
    {
      icon: HomeIcon,
      name: "Home",
      path: "/",
    },
    {
      icon: MonetizationOnIcon,
      name: "Expenses",
      path: "/expenses",
    },
    {
      icon: PointOfSaleIcon,
      name: "Incomes",
      path: "/incomes",
    },
    {
      icon: DescriptionIcon,
      name: "Add note",
      path: "/add-note",
    },
    {
      icon: FormatListNumberedIcon,
      name: "To Do",
      path: "/todo",
    },
  ];

  const down = [
    {
      icon: SettingsIcon,
      name: "Settings",
      path: "/settings",
    },
    {
      icon: AccountCircleIcon,
      name: "Profile",
      path: `/profile/${user.name}`,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "50%", width: "100%" }}>
        <List>
          {upper.map((listitem) => (
            <ListItem disablePadding key={listitem.name}>
              <ListItemButton onClick={() => navigate(listitem.path)}>
                <ListItemIcon>
                  <listitem.icon
                    fontSize="large"
                    sx={{ color: "primary.contrastText", fontSize: "2.5rem" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={listitem.name}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    color: "primary.contrastText",
                    fontWeight: "light",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          {down.map((listitem) => (
            <ListItem disablePadding key={listitem.name}>
              <ListItemButton>
                <ListItemIcon>
                  <listitem.icon
                    fontSize="large"
                    sx={{ color: "primary.contrastText", fontSize: "2.5rem" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={listitem.name}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    color: "primary.contrastText",
                    fontWeight: "light",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                signOut(auth);
                localStorage.removeItem("token");
                navigate("/register");
              }}
            >
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ height: "50%" }}></Box>
    </Box>
  );
};

export default Sidebar;
