import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  refreshTokenAction,
  registerAction,
  userDataAction,
} from "./authActions";
import User from "../../interfaces/user";
import type { RootState } from "../index";
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
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.errorData = action.payload;
        state.loading = false;
        state.error = true;
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
