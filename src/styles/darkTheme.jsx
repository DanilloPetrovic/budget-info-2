// theme.js
import { createTheme } from "@mui/material/styles";
import appFont from "../fonts/Lexend-VariableFont_wght.ttf";

const theme = createTheme({
  palette: {
    primary: {
      main: "#76ABAE", // Glavna boja (npr. za dugmad, naglaske)
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
});

export default theme;
