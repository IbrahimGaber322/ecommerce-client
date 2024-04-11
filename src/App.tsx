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
import { userDataAction } from "./store/auth/authActions";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import { getCartAction } from "./store/cart/cartActions";
import Products from "./pages/Products";
import WishList from "./pages/WishList";
/**
 * Main application component that handles routing and theme switching.
 */
function App() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  useEffect(() => {
    if (!user) {
      dispatch(userDataAction());
    }
    if (user) {
      dispatch(getCartAction());
    }
  }, [user, accessToken, dispatch]);

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            wishlist
            <Route path="/wishlist" element={<WishList />} />
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
