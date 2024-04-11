import api from "../../api";
import { refreshApi } from "../../api";

export const login = (loginData: { username: string; password: string }) =>
  api.post("users/login/", loginData);
export const register = (registerData: FormData) =>
  api.postForm("users/", registerData);
export const refreshToken = (refreshToken: string) =>
  refreshApi.post("token/refresh/", { refresh: refreshToken });
export const getUserData = () => api.get("users/me/");
export const resetPassword = (resetData: { password: string; token: string }) =>
  api.post("users/reset-password/", resetData);
export const sendResetPassword = (email: string) =>
  api.post("users/send-reset-password/", { email });
export const verifyEmail = (token: string) =>
  api.post("users/verify-email/", { token });
export const sendVerificationEmail = () => api.post("users/send-verify-email/");