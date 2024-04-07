import axios from "axios";
import { Store } from "redux";
import {
  selectAccessToken,
  selectRefreshToken,
  logOut,
} from "../store/auth/authSlice"; // Update the path as per your project structure
import { REFRESHTOKEN } from "../constants/actionTypes";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to decode token and check if it is expired
const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);
  const expiryTime = decodedToken.exp || 0;
  return expiryTime < moment().unix();
};

// Function to refresh access token
const refreshAccessToken = async (store: Store, refreshToken: string) => {
  await store.dispatch({
    type: REFRESHTOKEN,
    payload: { refreshToken },
  });
  return selectAccessToken(store.getState());
};

// Setup interceptors
export const setupInterceptors = (store: Store) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = selectAccessToken(store.getState());
      const refreshToken = selectRefreshToken(store.getState());

      if (accessToken && !isTokenExpired(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else if (refreshToken && !isTokenExpired(refreshToken)) {
        const newAccessToken = await refreshAccessToken(store, refreshToken);
        if (!isTokenExpired(newAccessToken)) {
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          store.dispatch(logOut());
        }
      } else {
        store.dispatch(logOut());
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api;
