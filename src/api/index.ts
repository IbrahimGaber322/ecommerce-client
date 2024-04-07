import axios from "axios";
import type { Store } from "redux";
import {
  selectAccessToken,
  selectRefreshToken,
  logOut,
} from "../store/auth/authSlice"; // Update the path as per your project structure
import { REFRESHTOKEN } from "../constants/actionTypes";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
export const setupInterceptors = (store: Store<any>) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = selectAccessToken(store.getState());
      const refreshToken = selectRefreshToken(store.getState());
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const expiryTime = decodedToken.exp || 0;
        const currentTime = moment().unix();
        if (expiryTime < currentTime) {
          if (refreshToken) {
            const decodedRefreshToken = jwtDecode(refreshToken);
            const refreshExpiryTime = decodedRefreshToken.exp || 0;
            if (refreshExpiryTime < currentTime) {
              store.dispatch(logOut());
            } else {
              await store.dispatch({
                type: REFRESHTOKEN,
                payload: { refreshToken },
              });
              const newAccessToken = selectAccessToken(store.getState());
              const newDecodedToken = jwtDecode(newAccessToken);
              const newExpiryTime = newDecodedToken.exp || 0;
              if (newExpiryTime < currentTime) {
                store.dispatch(logOut());
              } else {
                config.headers.Authorization = `Bearer ${newAccessToken}`;
              }
            }
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
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
