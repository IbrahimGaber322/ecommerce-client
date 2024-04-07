import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, refreshToken, getUserData } from "./authApi";
import {
  LOGIN,
  REGISTER,
  REFRESHTOKEN,
  USERDATA,
} from "../../constants/actionTypes";
import User from "../../interfaces/user";

export const loginAction = createAsyncThunk(
  LOGIN,
  async (payload: { username: string; password: string }) => {
    const response = await login(payload);
    return response.data;
  }
);

export const registerAction = createAsyncThunk(
  REGISTER,
  async (payload: User) => {
    const response = await register(payload);
    return response.data;
  }
);

export const refreshTokenAction = createAsyncThunk(
  REFRESHTOKEN,
  async (payload: string) => {
    const response = await refreshToken(payload);
    return response.data;
  }
);

export const userDataAction = createAsyncThunk(USERDATA, async () => {
  const response = await getUserData();
  return response.data;
});
