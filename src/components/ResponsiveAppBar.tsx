import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link, useLocation } from "react-router-dom";
import { selectUser } from "../store/auth/authSlice";
import { Login } from "@mui/icons-material";
import capitalizeFirst from "../util/capitalizeFirst";
import { useAppDispatch } from "../hooks/redux";
import { logOut } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { selectCartTotalQuantity } from "../store/cart/cartSlice";
import { selectWishList } from "../store/wishList/wishListSlicer";

const pages = ["electronics", "fashion", "books", "toys", "products"];

const settings = ["profile", "orders", "addresses", "wishlist"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const wishList = useSelector(selectWishList);

  const [search, setSearch] = React.useState("");

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const currPath = React.useMemo(
    () => location.pathname.replaceAll("/", ""),
    [location.pathname]
  );

  const searchParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAuth = () => {
    if (user) {
      handleCloseUserMenu();
      dispatch(logOut());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e: any) => {
    if (e.keyCode === 13) {
      searchParams.set("name", search);
      if (pages.includes(currPath)) {
        navigate(`${currPath}?${searchParams.toString()}`);
      } else {
        navigate(`products?${searchParams.toString()}`);
      }
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bazaar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={Link}
                  to={page}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {capitalizeFirst(page)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <MenuItem
              component={Link}
              to="/"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <StorefrontIcon />
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {capitalizeFirst(page)}
              </Button>
            ))}
          </Box>
          <Search
            onChange={handleChange}
            onKeyUp={handleSearch}
            sx={{ mr: 1, flexGrow: 0 }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {user && (
            <Box sx={{ width: "200px" }}>
              <Badge
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                badgeContent={cartQuantity}
                color="error"
              >
                <IconButton color="inherit" component={Link} to="/cart">
                  <ShoppingCart />
                </IconButton>
              </Badge>
              <Tooltip title="Open settings">
                <Badge badgeContent={wishList?.length || 0} color="error">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.first_name.charAt(0)}
                      src={user?.profile_image}
                    />
                  </IconButton>
                </Badge>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      component={Link}
                      sx={{ textDecoration: "none", color: "inherit" }}
                      to={setting}
                      textAlign="center"
                    >
                      {capitalizeFirst(setting)}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleAuth}>
                  <Typography
                    sx={{ textDecoration: "none", color: "inherit" }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!user && (
            <IconButton
              onClick={handleAuth}
              sx={{ mx: 2, color: "white", fontSize: 14 }}
            >
              Login
              <Login />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
