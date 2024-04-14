import { createSlice } from "@reduxjs/toolkit";
import {
  getCartAction,
  addToCartAction,
  updateCartItemAction,
  removeCartItemAction,
  clearCartAction,
} from "./cartActions";
import { toast } from "react-toastify";
import type { RootState } from "../index";
import CartItem from "../../interfaces/CartItem";

interface Cart {
  cartItems: { [key: number]: CartItem };
  loading: boolean;
  error: boolean;
}
const initialState: Cart = {
  cartItems: JSON.parse(localStorage.getItem("cart_items") || "{}") || {},
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCartItem: (state, action) => {
      const productId = action.payload.product.id;
      if (!state.cartItems[productId]) return;
      state.cartItems[productId] = {
        ...state.cartItems[productId],
        quantity: state.cartItems[productId].quantity + 1,
      };
      toast.info("Increased product quantity", {
        position: "bottom-left",
      });
      localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addToCartAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        const cartItem = action.payload;
        const { id: productId } = cartItem.product;
        if (state.cartItems[productId]) return;
        state.cartItems[productId] = cartItem;
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        toast.success("Added to cart", {
          position: "bottom-left",
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(getCartAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCartAction.fulfilled, (state, action) => {
        const cartItems = action.payload;
        cartItems.forEach((item: CartItem) => {
          state.cartItems[item.product.id] = item;
        });
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        state.loading = false;
        state.error = false;
      })
      .addCase(updateCartItemAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCartItemAction.fulfilled, (state, action) => {
        const updatedCartItem = action.payload;
        const { id: productId } = updatedCartItem.product;
        if (!state.cartItems[productId]) return;
        toast.info("Updated cart item", {
          position: "bottom-left",
        });
        state.cartItems[productId] = updatedCartItem;
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        state.loading = false;
        state.error = false;
      })
      .addCase(updateCartItemAction.rejected, (state, action) => {
        toast.error("Error updating cart item", {
          position: "bottom-left",
        });
        state.loading = false;
        state.error = true;
      })
      .addCase(removeCartItemAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeCartItemAction.fulfilled, (state, action) => {
        const productId = action.payload;
        delete state.cartItems[productId];
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        toast.success("Removed from cart", {
          position: "bottom-left",
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(clearCartAction.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(clearCartAction.fulfilled, (state, action) => {
        state.cartItems = {};
        localStorage.setItem("cart_items", JSON.stringify(state.cartItems));
        toast.success("Cleared cart", {
          position: "bottom-left",
        });
        state.loading = false;
        state.error = false;
      });
  },
});
export const { incrementCartItem } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) =>
  Object.values(state.cart.cartItems).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
export const selectCartTotalAmount = (state: RootState) =>
  Object.values(state.cart.cartItems)
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);
export const selectCartItemQuantity = (state: RootState, productId: number) => {
  return state.cart.cartItems[productId]?.quantity || 0;
};
export const selectCartItemId = (state: RootState, productId: number) => {
  return state.cart.cartItems[productId]?.id || 0;
};
export const selectCartLoading = (state: RootState) => state.cart.loading;

export default cartSlice.reducer;
