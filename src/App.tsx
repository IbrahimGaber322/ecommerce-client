import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
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
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Orders from "./pages/orders";
import Addresses from "./pages/Address";
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

  const productsRoutes = [
    "products",
    "electronics",
    "fashion",
    "books",
    "toys",
  ];

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline enableColorScheme />

        {/* Main container */}
        <Container
          component="main"
          sx={{
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
          maxWidth={false}
          disableGutters
        >
          <ResponsiveAppBar />
          {/* Routing configuration */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/checkout"
              element={!user ? <Navigate to={"/"} /> : <Checkout />}
            />
            <Route
              path="/orders"
              element={!user ? <Navigate to={"/"} /> : <Orders />}
            />
            {productsRoutes.map((routePath, index) => {
              return (
                <Route
                  path={routePath}
                  element={<Products />}
                  key={`page-${index}`}
                />
              );
            })}
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={!user ? <Navigate to={"/"} /> : <Cart />}
            />
            <Route
              path="/wishlist"
              element={!user ? <Navigate to={"/"} /> : <WishList />}
            />

            <Route
              path="/register"
              element={user ? <Navigate to={"/"} /> : <Register />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to={"/"} /> : <Login />}
            />
            <Route
              path="/forgot-password"
              element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
            />
            <Route
              path="reset-password/:token"
              element={user ? <Navigate to={"/"} /> : <ResetPassword />}
            />
            <Route
              path="reset-password"
              element={user ? <Navigate to={"/"} /> : <ResetPassword />}
            />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Box marginTop={"auto"}>
            <Footer dark={dark} />
          </Box>

          {/* Dark mode switch */}
          <MaterialUISwitch
            sx={{ position: "absolute", bottom: 0, right: 0, m: 1 }}
            checked={dark}
            onChange={(e: any) => {
              setDark(e.target.checked);
            }}
          />
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
