import { createSlice } from "@reduxjs/toolkit";
import Address from "../../interfaces/Address";
import {
  addAddress,
  getAddresses,
  deleteAddress,
  updateAddress,
} from "./addressActions";
import { toast } from "react-toastify";
import { RootState } from "..";

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: boolean;
  errorData: string;
}

const initialState: AddressState = {
  addresses: JSON.parse(localStorage.getItem("addresses") || "[]") || [],
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
        localStorage.setItem("addresses", JSON.stringify(action.payload));
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
        state.addresses.push(action.payload);
        localStorage.setItem("addresses", JSON.stringify(state.addresses));
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
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        );
        localStorage.setItem("addresses", JSON.stringify(state.addresses));
        toast.info("Deleted successfully!", {
          position: "bottom-left",
        });
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
        toast.info(`Error deleting address`, {
          position: "bottom-left",
        });
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const updatedAddress = action.payload;
        const index = state.addresses.findIndex(
          (address) => address.id === updatedAddress.id
        );
        state.addresses[index] = updatedAddress;
        localStorage.setItem("addresses", JSON.stringify(state.addresses));
        toast.info("Updated successfully!", {
          position: "bottom-left",
        });
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData = action.payload;
        toast.info(`Error updating address`, {
          position: "bottom-left",
        });
      });
  },
});

export default addressSlice.reducer;

export const selectAddresses = (state: RootState) => state.address.addresses;
