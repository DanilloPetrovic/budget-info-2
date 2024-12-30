import {
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
import DescriptionIcon from "@mui/icons-material/Description";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  const upper = [
    {
      icon: HomeIcon,
      name: "Home",
    },
    {
      icon: MonetizationOnIcon,
      name: "Expenses",
    },
    {
      icon: DescriptionIcon,
      name: "Add note",
    },
    {
      icon: FormatListNumberedIcon,
      name: "To Do",
    },
  ];

  const down = [
    {
      icon: SettingsIcon,
      name: "Settings",
    },
    {
      icon: AccountCircleIcon,
      name: "Profile",
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
            <ListItem disablePadding>
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

          <Divider />

          {down.map((listitem) => (
            <ListItem disablePadding>
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
        </List>
      </Box>
      <Box sx={{ height: "50%" }}></Box>
    </Box>
  );
};

export default Sidebar;
