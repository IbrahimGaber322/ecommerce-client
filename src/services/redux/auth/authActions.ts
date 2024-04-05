import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, refreshToken, getUserData } from "../../api/authApi";
import User from "../../../interfaces/user";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }) => {
    const response = await login(payload);
    return response.data;
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (payload: User) => {
    const response = await register(payload);
    return response.data;
  }
);

export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken",
  async (payload: string) => {
    const response = await refreshToken(payload);
    return response.data;
  }
);

export const userDataAction = createAsyncThunk("auth/userData", async () => {
  const response = await getUserData();
  return response.data;
});
