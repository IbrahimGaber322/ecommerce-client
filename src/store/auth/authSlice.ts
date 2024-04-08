import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction, userDataAction } from "./authActions";
import User from "../../interfaces/user";
interface AuthState {
  auth: {
    access_token: string;
    refresh_token: string;
    loading: boolean;
    error: boolean;
    user: User | null;
    errorData: any;
  };
}

const initialState = {
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loading: false,
  error: false,
  user: null,
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
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
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
      .addCase(userDataAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(userDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: AuthState) => state.auth.access_token;
export const selectRefreshToken = (state: AuthState) =>
  state.auth.refresh_token;
export const selectAuthLoading = (state: AuthState) => state.auth.loading;
export const selectAuthError = (state: AuthState) => state.auth.error;
export const selectUser = (state: AuthState) => state.auth.user;
export const selectAuthErrData = (state: AuthState) => state.auth.errorData;
