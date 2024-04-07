import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, refreshToken, getUserData } from "./authApi";
import {
  LOGIN,
  REGISTER,
  REFRESHTOKEN,
  USERDATA,
} from "../../constants/actionTypes";
import { thunkWrapper } from "../thunkWrapper";
import User from "../../interfaces/user";

export const loginAction = thunkWrapper(
  LOGIN,
  async (payload: { username: string; password: string }) => {
    const response = await login(payload);
    return response.data;
  }
);

export const registerAction = thunkWrapper(
  REGISTER,
  async (payload: FormData) => {
    const response = await register(payload);
    return response.data;
  }
);

export const refreshTokenAction = thunkWrapper(
  REFRESHTOKEN,
  async (payload: string) => {
    const response = await refreshToken(payload);
    return response.data;
  }
);

export const userDataAction = thunkWrapper(USERDATA, async () => {
  const response = await getUserData();
  return response.data;
});
