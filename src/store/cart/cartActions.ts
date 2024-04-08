import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserCart as getUserCartApi,
  creatCartForUser as createCartForUserApi,
  addItemToCart as addItemToCartApi,
  removeCartItem as removeCartItemApi,
} from './cartApi'; 
import {
  FETCH_USER_CART,
  CREATE_CART_FOR_USER,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../constants/actionTypes";

export const fetchUserCart = createAsyncThunk(
  FETCH_USER_CART,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserCartApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCartForUser = createAsyncThunk(
  CREATE_CART_FOR_USER,
  async (_, { rejectWithValue }) => {
    try {
      const response = await createCartForUserApi();
      return response.data;
    } catch (error: any) { 
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  ADD_ITEM_TO_CART,
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await addItemToCartApi(data);
      return response.data;
    } catch (error: any) { 
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  REMOVE_ITEM_FROM_CART,
  async (itemId: number, { rejectWithValue }) => {
    try {
      await removeCartItemApi(itemId);
      return itemId;
    } catch (error: any) { 
      return rejectWithValue(error.response.data);
    }
  }
);