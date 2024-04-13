import { createSlice } from "@reduxjs/toolkit";
import Address from "../../interfaces/Address";
import { addAddress, getAddresses } from "./addressActions";
import { toast } from "react-toastify";

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
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        toast.info("Added successfully!", {
          position: "bottom-left",
        });
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
        toast.info(`Error adding address`, {
          position: "bottom-left",
        });
      });
  },
});

export default addressSlice.reducer;

export const selectAddresses = (state: AddressState) => state.address.addresses;
