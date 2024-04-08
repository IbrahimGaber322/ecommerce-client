import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import MaterialUISwitch from "./components/ui/MaterialUISwitch";
import { useAppDispatch } from "./hooks/redux";
import { selectUser, selectAccessToken } from "./store/auth/authSlice";
import { store } from "./store";
import { userDataAction } from "./store/auth/authActions";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import api from "./api";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";

/**
 * Main application component that handles routing and theme switching.
 */
function App() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  useEffect(() => {
    if (!user && accessToken) {
      dispatch(userDataAction());
    }
  }, [user, accessToken, dispatch]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await api.get("/product/");
  //       console.log("Data: ", data);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   }
  //   fetchData();
  // });

  // Retrieve dark mode state from local storage or set to default.
  const darkState =
    localStorage.getItem("dark") !== null
      ? JSON.parse(localStorage.getItem("dark") as string)
      : false;

  // State to manage dark mode.
  const [dark, setDark] = useState(darkState);

  // Store dark mode preference in local storage.
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline enableColorScheme />

        {/* Main container */}
        <Container
          component="main"
          sx={{ minHeight: "100vh", position: "relative" }}
          maxWidth={false}
          disableGutters
        >
          <ResponsiveAppBar />
          {/* Routing configuration */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart/>} /> 
            <Route path="/productDetails" element={<ProductDetail/>} />
          </Routes>

          {/* Dark mode switch */}
          <MaterialUISwitch
            sx={{ position: "absolute", bottom: 0, right: 0, m: 1 }}
            checked={dark}
            onChange={(e: any) => {
              setDark(e.target.checked);
            }}
          />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
