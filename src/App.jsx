import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/RegisterLogin/Register";
import Login from "./pages/RegisterLogin/Login";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/darkTheme";
import { getUser } from "./firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { uid, name, email, expenses, incomes, incomesCategories } =
    useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      await getUser(dispatch(setData));
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
