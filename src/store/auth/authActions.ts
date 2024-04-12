import {
  login,
  register,
  refreshToken,
  getUserData,
  resetPassword,
  sendResetPassword,
  sendVerificationEmail,
  verifyEmail
} from "./authApi";
import {
  LOGIN,
  REGISTER,
  REFRESHTOKEN,
  USERDATA,
  RESET_PASSWORD,
  SEND_RESET_PASSWORD,
  SEND_VERIFY_EMAIL,
  VERIFY_EMAIL
} from "../../constants/actionTypes";
import { thunkWrapper } from "../thunkWrapper";

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

export const resetPasswordAction = thunkWrapper(
  RESET_PASSWORD,
  async (payload: { password: string; token: string }) => {
    const response = await resetPassword(payload);
    return response.data;
  }
);

export const sendResetPasswordAction = thunkWrapper(
  SEND_RESET_PASSWORD,
  async (payload: string) => {
    const response = await sendResetPassword(payload);
    return response.data;
  }
);

export const verifyEmailAction = thunkWrapper(
  VERIFY_EMAIL,
  async (payload: string) => {
    const response = await verifyEmail(payload);
    return response.data;
  }
);

export const sendVerificationEmailAction = thunkWrapper(
  SEND_VERIFY_EMAIL,
  async () => {
    const response = await sendVerificationEmail();
    return response.data;
  }
);