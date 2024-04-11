import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../hooks/redux";
import { useParams } from "react-router-dom";
import { resetPasswordAction } from "../store/auth/authActions";

import {
  Grid,
  Box,
  Typography,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormControl,
  FormHelperText,
  Paper,
} from "@mui/material";

const initialState = { password: "", confirmPassword: "" };
const initialErrorState = { password: false, confirmPassword: false };
const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const [showPassword, setShowPassword] = React.useState(false);
  const { token } = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ||
      formData.confirmPassword !== formData.password
    ) {
      setError({
        password: !formData.password.match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
        confirmPassword: formData.confirmPassword !== formData.password,
      });
    } else {
      dispatch(
        resetPasswordAction({ password: formData?.password, token: token })
      );
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  return token ? (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: "sm",
          borderRadius: 4,
          mt: 4,
          p: 3,
          "@media only screen and (max-width: 600px)": { p: 1 },
        }}
      >
        <Grid container>
          <Grid pt={2} item xs={12}>
            <Typography textAlign="center" variant="h4">
              Enter new password
            </Typography>
          </Grid>
          <Grid pt={2} item xs={12}>
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
                  ? "Password must be at least 8 chars long and contain a number."
                  : false}
              </FormHelperText>
            </FormControl>
          </Grid>
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

          <Grid pt={2} item xs={12}>
            <Button
              className="button-submit"
              variant="contained"
              type="submit"
              fullWidth
            >
              <Typography fontWeight={600}>Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  ) : (
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>
          Please check the reset password email in your mailbox.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
