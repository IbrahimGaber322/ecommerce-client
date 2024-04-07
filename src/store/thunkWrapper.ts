import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkWrapper: any = (type: string, thunk: any): any => {
  return createAsyncThunk<any>(type, async (arg, thunkAPI) => {
    try {
      // do some stuff here that happens on every action
      return await thunk(arg, thunkAPI);
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
};
