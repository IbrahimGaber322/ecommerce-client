// Import necessary modules and components from Material-UI
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../store/auth/authActions";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UseSelector } from "react-redux";
import { selectAuthErrData, selectAuthError, selectUser } from "../store/auth/authSlice";

// Initial state for the form fields
const initialState = { username: "", password: "" };

// Sign In component
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorData = useSelector(selectAuthErrData);
  const user = useSelector(selectUser);
  
  const [changed, setChanged] = React.useState(false);
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Function to handle changes in form fields
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setChanged(true);
    setError(false);
  };

  // Function to handle form submission
  const handleSubmit = (event: any) => {
    if (formData.username.length > 0 && formData.password.length > 0) {
      // Dispatch sign in action
      dispatch(loginAction(formData));
    }
    setChanged(false);
    event.preventDefault();
  };

  // Render the sign-in form
  return (
    <Container sx={{ pt: 8 }} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Username input field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            type="text"
            onChange={handleChange}
            autoFocus
          />
          {/* Password input field */}
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
              error={error}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {/* Display error message if error is true */}
            <FormHelperText>{error && "Incorrect Password."}</FormHelperText>
          </FormControl>

          {(errorData?.detail && !changed ) && (
            <Typography color="error" variant="body2">
              {errorData.detail}
            </Typography>
          )}

          {/* Sign In button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* Links to other pages */}
          <Grid container>
            <Grid item xs>
              <Link href="/forget" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
