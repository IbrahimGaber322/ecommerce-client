import api from "../../api";
import { refreshApi } from "../../api";

export const login = (loginData: { username: string; password: string }) =>
  api.post("users/login/", loginData);
export const register = (registerData: FormData) =>
  api.postForm("users/", registerData);
export const refreshToken = (refreshToken: string) =>
  refreshApi.post("token/refresh/", { refresh: refreshToken });
export const getUserData = () => api.get("users/me/");
