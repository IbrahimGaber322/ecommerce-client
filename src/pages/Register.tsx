// Importing necessary components and styles from MUI and React
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../hooks/redux";
import { registerAction } from "../store/auth/authActions";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { selectAuthErrData, selectUser } from "../store/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Initial state for the form
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  profile_image: null,
  username: "",
};

// Initial state for error handling
const initialErrorState = {
  first_name: false,
  last_name: false,
  email: false,
  password: false,
  confirmPassword: false,
  username: false,
};

// Component for user registration (sign up)
export default function Register() {
  // Redux dispatch and navigation hookF
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorData = useSelector(selectAuthErrData);
  const user = useSelector(selectUser);

  // State management
  const [image, setImage] = React.useState<undefined | string>(undefined);
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(initialErrorState);

  // Toggles password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handles input change in the form fields
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: `${formData.first_name} ${formData.last_name}`,
    });
    setError({ ...error, [e.target.name]: false });
  };

  // Handles form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validation checks for form fields
    if (
      formData.first_name.length === 0 ||
      formData.last_name.length === 0 ||
      !formData.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
      !formData.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ) ||
      formData.confirmPassword !== formData.password
    ) {
      setError({
        first_name: formData.first_name.length === 0,
        last_name: formData.last_name.length === 0,
        email: !formData.email.match(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        ),
        password: !formData.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        ),
        confirmPassword: formData.confirmPassword !== formData.password,
        username: formData.username.length === 0,
      });
    } else {
      const formDataCopy = new FormData();
      formDataCopy.append("first_name", formData.first_name);
      formDataCopy.append("last_name", formData.last_name);
      formDataCopy.append("email", formData.email);
      formDataCopy.append("password", formData.password);
      formDataCopy.append("username", formData.username);
      if (formData.profile_image) {
        formDataCopy.append("profile_image", formData.profile_image);
      }
      console.log(formData.profile_image);
      // Dispatches sign-up action if form data is valid
      dispatch(registerAction(formDataCopy));
      /*   navigate("/"); */
    }
  };

  const addImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return setImage(undefined);
    setImage(URL.createObjectURL(e?.target?.files[0]));
    setFormData({ ...formData, profile_image: file });
  };
  // JSX code for rendering the sign-up form
  return (
    <Container sx={{ pt: 2 }} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Box position={"relative"}>
            <IconButton
              sx={{ position: "absolute", bottom: 0, right: -20, zIndex: 1 }}
              component="label"
            >
              <PhotoCamera />
              <input
                hidden
                onChange={(e) => addImage(e)}
                accept="image/*"
                multiple
                type="file"
              />
            </IconButton>
            <Avatar
              src={image}
              sx={{ width: "100px", height: "100px", fontSize: 50 }}
            >
              {formData.name.charAt(0)}
            </Avatar>
          </Box>
        </Box>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                helperText={
                  error.first_name ? "Please enter your first name." : false
                }
                value={formData.first_name}
                inputProps={{ maxLength: 20 }}
                error={error.first_name}
                onChange={handleChange}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={formData.last_name}
                inputProps={{ maxLength: 20 }}
                helperText={
                  error.last_name ? "Please enter your last name." : false
                }
                error={error.last_name}
                onChange={handleChange}
              />
            </Grid>
            {/* Hidden field for full name */}
            <TextField
              name="name"
              value={`${formData.first_name} ${formData.last_name}`}
              sx={{ display: "none" }}
            />
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formData.email}
                error={error.email}
                helperText={
                  error.email ? "Please enter your email correctly." : false
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                type="text"
                value={formData.username}
                error={error.username}
                helperText={
                  error.username
                    ? "Please enter your username correctly."
                    : false
                }
                onChange={handleChange}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <FormControl
                error={error.password}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
                <FormHelperText>
                  {error.password
                    ? "Password must be at least 8 chars long, contain 1 number and 1 special char."
                    : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Confirm Password */}
            <Grid pt={2} item xs={12}>
              <FormControl
                error={error.confirmPassword}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type="password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                />
                <FormHelperText>
                  {error.confirmPassword ? "Passwords don't match." : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Checkbox */}
            {(errorData?.username || errorData?.email) && (
              <Grid item xs={12}>
                {errorData?.username && (
                  <Typography color="error" variant="body2">
                    Username is used.
                  </Typography>
                )}
                {errorData?.email && (
                  <Typography color="error" variant="body2">
                    Email is used.
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
          {/* Sign-up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
