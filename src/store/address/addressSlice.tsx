import { createSlice } from "@reduxjs/toolkit";
import Address from "../../interfaces/Address";
import { addAddress, getAddresses } from "./addressActions";

interface AddressState {
  address: {
    addresses: Address[];
    loading: boolean;
    error: boolean;
    errorData: string;
  };
}

const initialState = {
  addresses: [],
  loading: false,
  error: false,
  errorData: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* GET ADDRESSES */
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.addresses = action.payload;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
      })
      /* ADD ADDRESSES */
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
      });
  },
});

export default addressSlice.reducer;

export const selectAddresses = (state: AddressState) => state.address.addresses;
