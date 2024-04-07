import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction, userDataAction } from "./authActions";
import User from "../../interfaces/user";
interface AuthState {
  auth: {
    accessToken: string;
    refreshToken: string;
    loading: boolean;
    error: boolean;
    user: User | null;
  };
}

const initialState = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  loading: false,
  error: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    logOut: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(registerAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(registerAction.rejected, (state, action) => {
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

export const selectAccessToken = (state: AuthState) => state.auth.accessToken;
export const selectRefreshToken = (state: AuthState) => state.auth.refreshToken;
export const selectAuthLoading = (state: AuthState) => state.auth.loading;
export const selectAuthError = (state: AuthState) => state.auth.error;
export const selectUser = (state: AuthState) => state.auth.user;
