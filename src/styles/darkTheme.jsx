// theme.js
import { createTheme } from "@mui/material/styles";
import appFont from "../fonts/Lexend-VariableFont_wght.ttf";

const theme = createTheme({
  palette: {
    primary: {
      main: "#76ABAE", //d Glavna boja (npr. za dugmad, naglaske)
      light: "#8bc9cc", // Svetlija nijansa
      dark: "#58898c", // Tamnija nijansa
      contrastText: "#EEEEEE", // Tekst na primarnoj boji
    },
    background: {
      default: "#222831", // Pozadina aplikacije
      paper: "#31363F", // Pozadina elemenata poput kartica
      inputHover: "#3e444f",
    },
  },
  typography: {
    fontFamily: { appFont },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
