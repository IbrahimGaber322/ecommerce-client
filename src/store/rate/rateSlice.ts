import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllRatesAction,
  addRatingToProductAction,
	updateRatingForProductAction,
} from "./rateActions";
import { toast } from "react-toastify";

interface RateState {
  rates: any | null;
  loading: boolean;
  error: string | null;
}
interface State {
  rate: RateState;
}

const initialState: RateState = {
  rates: [],
  loading: false,
  error: null,
};

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add rating to product
    builder.addCase(addRatingToProductAction.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addRatingToProductAction.fulfilled, (state, action) => {
      state.loading = false;
      const newRating = action.payload;
      state.rates.push(newRating);
      toast.success("Rated successfully", {
        position: "bottom-left",
      });
    });
    builder.addCase(addRatingToProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add new rating";
      toast.error("Failed to rate", {
        position: "bottom-left",
      });
    });

    // Fetch all rates
    builder.addCase(fetchAllRatesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllRatesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.rates = action.payload;
    });
    builder.addCase(fetchAllRatesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch rates";
    });

		// Update rating for product
		builder.addCase(updateRatingForProductAction.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateRatingForProductAction.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.rates.findIndex((rate: any) => rate.id === action.payload.id);

      if (index !== -1) {
        const updatedRates = [...state.rates];

        updatedRates[index] = action.payload;

        state.rates = updatedRates;
      }

      toast.info("Rating updated", {
        position: "bottom-left",
      });
    });
    builder.addCase(updateRatingForProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update rate for product";
      toast.error("Failed to update rating", {
        position: "bottom-left",
      });
    });
  },
});

export default rateSlice.reducer;

// Selectors
export const selectRates = (state: State) => state.rate.rates;
export const selectRateLoading = (state: State) => state.rate.loading;
export const selectRateError = (state: State) => state.rate.error;
