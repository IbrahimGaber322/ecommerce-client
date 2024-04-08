import { createSlice, } from "@reduxjs/toolkit";
import { fetchUserCart, createCartForUser, addItemToCart, removeItemFromCart } from "./cartActions";
import { toast } from "react-toastify";
import CartItem from '../../interfaces/CartItem';
import Product from '../../interfaces/Product';
interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("activated")
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          quantity: state.cartItems[existingIndex].quantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      console.log("activated")
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { product, quantity } = cartItem;
          const itemTotal = product.price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
//   extraReducers: (builder) => {
//     builder
//       // Update state when fetching user's cart succeeds
//       .addCase(fetchUserCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload; // Assuming payload is the cart items
//       })
//       // Update state when creating cart for user succeeds
//       .addCase(createCartForUser.fulfilled, (state, action) => {
//         // Do something if needed
//       })
//       // Update state when adding item to cart succeeds
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         // Do something if needed
//       })
//       // Update state when removing item from cart succeeds
//       .addCase(removeItemFromCart.fulfilled, (state, action) => {
//         // Do something if needed
//       })
//       // Handle rejected actions
//       .addMatcher(
//         (action) =>
//           action.type.endsWith("/rejected") &&
//           action.error.message === "Request failed with status code 400", // Adjust error message as needed
//         (state, action) => {
//           //
//         }
//       );
//   },
});
export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;