import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  refreshTokenAction,
  registerAction,
  userDataAction,
  editUserAction,
  sendResetPasswordAction,
  resetPasswordAction,
  verifyEmailAction,
  sendVerificationEmailAction,
} from "./authActions";
import User from "../../interfaces/user";
import type { RootState } from "../index";
import { toast } from "react-toastify";
interface AuthState {
  access_token: string;
  refresh_token: string;
  loading: boolean;
  error: boolean;
  user: User | null;
  errorData: any;
}

const initialState: AuthState = {
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loading: false,
  error: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  errorData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    },
    logOut: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.access_token = action.payload.access;
        state.refresh_token = action.payload.refresh;
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
        toast.error("Invalid credentials", { position: "bottom-left" });
      })
      .addCase(registerAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorData = null;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        toast.success("Registration successful", { position: "bottom-left" });
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.errorData = action.payload;
        state.loading = false;
        state.error = true;
        toast.error("Error registering", { position: "bottom-left" });
      })
      .addCase(refreshTokenAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.access_token = action.payload.access;
        localStorage.setItem("access_token", action.payload.access);
      })
      .addCase(refreshTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(userDataAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.access_token = "";
        state.refresh_token = "";
        state.user = null;
        localStorage.clear();
      })
      .addCase(editUserAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(editUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(sendResetPasswordAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendResetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.success("Password reset link sent to your email", {
          position: "bottom-left",
        });
      })
      .addCase(sendResetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error("Error sending reset password link", {
          position: "bottom-left",
        });
      })
      .addCase(resetPasswordAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.success("Password reset successful", { position: "bottom-left" });
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error("Error resetting password", { position: "bottom-left" });
      })
      .addCase(verifyEmailAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.success("Email verified", { position: "bottom-left" });
      })
      .addCase(verifyEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error("Error verifying email", { position: "bottom-left" });
      })
      .addCase(sendVerificationEmailAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendVerificationEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.success("Verification email sent", { position: "bottom-left" });
      })
      .addCase(sendVerificationEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error("Error sending verification email", {
          position: "bottom-left",
        });
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) =>
  state.auth.refresh_token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthErrData = (state: RootState) => state.auth.errorData;
