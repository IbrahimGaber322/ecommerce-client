import { thunkWrapper } from "../thunkWrapper";
import {
  addRatingToProduct,
  fetchAllRates,
  updateRatingForProduct,
} from "./rateApi";
import {
  ADD_RATING_TO_PRODUCT,
  FETCH_ALL_RATES,
  UPDATE_RATING_FOR_PRODUCT
} from "../../constants/actionTypes";

export const addRatingToProductAction = thunkWrapper(
    ADD_RATING_TO_PRODUCT,
    async (payload: {productId: number, rating: number }) => {
      const { productId, rating } = payload;
      const response = await addRatingToProduct(productId, rating);
      return response.data;
    }
  );
  
  export const fetchAllRatesAction = thunkWrapper(
    FETCH_ALL_RATES,
    async () => {
      const response = await fetchAllRates();
      return response.data;
    }
  );
  
  export const updateRatingForProductAction = thunkWrapper(
    UPDATE_RATING_FOR_PRODUCT,
    async (payload: {rateId: number, rating: number }) => {
      const { rateId, rating } = payload;
      const response = await updateRatingForProduct(rateId, rating);
      return response.data;
    }
  );