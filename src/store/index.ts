import { configureStore } from "@reduxjs/toolkit";
import { setupInterceptors } from "../api";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    // Directly pass your slices here
    auth: authSlice,
    cart:cartSlice
  },
});

setupInterceptors(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
