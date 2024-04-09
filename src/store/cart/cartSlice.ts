import { createSlice, } from "@reduxjs/toolkit";
import { fetchUserCart, createCartForUser , removeItemFromCart } from "./cartActions";
import {addItemToCart,removeCartItem} from "./cartApi"
import { toast } from "react-toastify";
import CartItem from '../../interfaces/CartItem';
import Product from '../../interfaces/Product';
interface CartState {
 cart:{
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
 }
}


const initialState: CartState = {
  cart:{
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("activated");
      const existingIndex = state.cart.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );
      console.log(`existingIndex is ${existingIndex}`);
    
      if (existingIndex >= 0) {
        console.log(`here `);
        state.cart.cartItems[existingIndex] = {
          ...state.cart.cartItems[existingIndex],
          quantity: state.cart.cartItems[existingIndex].quantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let product = action.payload.id;
        let tempProductItem = { cart: 2, product: product, quantity: 1 };
        console.log("here");
        addItemToCart(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      console.log(state.cart.cartItems)
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    decreaseCart(state, action) {
      console.log("activated")
      const itemIndex = state.cart.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart.cartItems[itemIndex].quantity > 1) {
        state.cart.cartItems[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cart.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cart.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cart.cartItems = nextCartItems;
        removeCartItem(action.payload.id)
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    increaseCart(state, action) {
      console.log("activated");
      const itemIndex = state.cart.cartItems.findIndex(
          (item) => item.id === action.payload.id
      );
  
      if (itemIndex >= 0) {
          state.cart.cartItems[itemIndex].quantity += 1;
  
          toast.info("Increased product quantity", {
              position: "bottom-left",
          });
      } else {
          console.log("Item not found in cart");
      }
  
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    removeFromCart(state, action) {
      state.cart.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cart.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cart.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        removeCartItem(action.payload.id)
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        console.log(`the is item id : ${cartItem.id}`)
      
       
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cart.cartItems.reduce(
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
      state.cart.cartTotalQuantity = quantity;
      state.cart.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cart.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart.cartItems = action.payload[0].items;
        console.log(state.cart.cartItems)
      })

      // .addCase(createCartForUser.fulfilled, (state, action) => {
               
      // })
      // // Update state when adding item to cart succeeds
      // .addCase(addItemToCart.fulfilled, (state, action) => {
      //   // Do something if needed
      // })
      // // Update state when removing item from cart succeeds
      // .addCase(removeItemFromCart.fulfilled, (state, action) => {
      //   // Do something if needed
      // })
      // // Handle rejected actions
      // .addMatcher(
      //   (action) =>
      //     action.type.endsWith("/rejected") &&
      //     action.error.message === "Request failed with status code 400", 
      //   (state, action) => {
      //     //
      //   }
      // );
  },
});
export const { addToCart, decreaseCart, increaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;
export const selectCart = (state: CartState) => state.cart;
// export const getTotalQunatity = (state: CartState) => state.;
export default cartSlice.reducer;