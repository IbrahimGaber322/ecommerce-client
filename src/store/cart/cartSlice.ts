import { createSlice } from "@reduxjs/toolkit";
import {
  getCartAction,
  addToCartAction,
  updateCartItemAction,
} from "./cartActions";
import { toast } from "react-toastify";
import CartItem from "../../interfaces/CartItem";
import Product from "../../interfaces/Product";
import Cart from "../../interfaces/Cart";
import type { RootState } from "../index";

const initialState: Cart = {
  cartItems: JSON.parse(localStorage.getItem("cart_items") || "[]") || [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCartItem: (state, action) => {
      console.log("Add to cart action", action.payload);
      const productId = action.payload.id;
      const existingIndex = state.cartItems?.findIndex(
        (item) => item.product.id === productId
      );
      if (existingIndex === -1) return;
      state.cartItems[existingIndex] = {
        ...state.cartItems[existingIndex],
        quantity: state.cartItems[existingIndex].quantity + 1,
      };
      toast.info("Increased product quantity", {
        position: "bottom-left",
      });
      console.log(state.cartItems);
      localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        toast.success("Added to cart", {
          position: "bottom-left",
        });
      })
      .addCase(getCartAction.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
      })
      .addCase(updateCartItemAction.fulfilled, (state, action) => {
        const updatedCartItem = action.payload;
        const existingIndex = state.cartItems.findIndex(
          (item) => item.product.id === updatedCartItem.product.id
        );
        if (existingIndex === -1) return;
        state.cartItems[existingIndex] = updatedCartItem;
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
      }).addCase(updateCartItemAction.rejected, (state, action) => {
        toast.error("Error updating cart item", {
          position: "bottom-left",
        });
        console.log("Error updating cart item", action.payload);
      }
      );
  },
});
export const { incrementCartItem } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;
export const selectCartItemQuantity = (state: RootState, productId: number) => {
  const item = state.cart.cartItems.find(
    (item) => item.product.id === productId
  );
  return item ? item.quantity : 0;
};
export const selectCartItemId = (state: RootState, productId: number) => {
  const item = state.cart.cartItems.find(
    (item) => item.product.id === productId
  );
  return item ? item.id : 0;
};

export default cartSlice.reducer;
