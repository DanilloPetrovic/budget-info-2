import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/RegisterLogin/Register";
import Login from "./pages/RegisterLogin/Login";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/darkTheme";
import { getUser } from "./firebase";
import { useEffect } from "react";
import AddNote from "./pages/AddNote/AddNote";
import ToDo from "./pages/AddToDo/ToDo";
import Incomes from "./pages/Incomes/Incomes";

function App() {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/incomes" element={<Incomes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
