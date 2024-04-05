import api from ".";

export const login = (loginData:{username:string; password:string;}) => api.post("users/login/", loginData);
export const register = (registerData:{username:string; email:string; password:string;}) => api.post("users/", registerData);
export const refreshToken = (refreshToken:string) => api.post("users/refresh/", {refresh:refreshToken});
export const getUserData = () => api.get("users/me/");

