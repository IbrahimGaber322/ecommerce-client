import { createSlice } from "@reduxjs/toolkit";
import {
    getWishListAction, 
    addToWishListAction,
    removeWishListItemAction, 
} from "./wishListAction";
import { toast } from "react-toastify";
import WishList from "../../interfaces/WishList";
import Product from "../../interfaces/Product";
import type { RootState } from "../index";
import WishListItem from "../../interfaces/WishListItem";

interface WishListState {
  wishlistItems: WishListItem[];
  loading: boolean;
  error: string | null;
}
const initialState: WishListState  = {
    wishlistItems: JSON.parse(localStorage.getItem("wishlist_items") || "[]") || [],
    loading: true,
    error: null,
};
const cartSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(addToWishListAction.fulfilled, (state, action) => {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlist_items", JSON.stringify(state.wishlistItems));
        toast.success("Added to cart", {
          position: "bottom-left",
        });
      })
      .addCase(getWishListAction.pending, (state) => {
        state.error = null;
       })
      .addCase(getWishListAction.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
        state.loading = false;
        localStorage.setItem("wishlist_items", JSON.stringify(state.wishlistItems));
      })
      .addCase(removeWishListItemAction.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
        state.loading = false;
        localStorage.setItem("wishlist_items", JSON.stringify(state.wishlistItems));
      })
  },
});
export const selectWishList= (state: RootState) => state.wishlist;
export const selectWishListLoading = (state: RootState) => state.wishlist.loading;
export default cartSlice.reducer;
