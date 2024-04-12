import { thunkWrapper } from "../thunkWrapper";
import {
  getCart,
  addToCart,
  removeCartItem,
  updateCartItem,
  clearCart,
} from "./cartApi";
import {
  GET_CART,
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM,
  CLEAR_CART,
} from "../../constants/actionTypes";
import CartItem from "../../interfaces/CartItem";

export const getCartAction = thunkWrapper(
  GET_CART,
  async (): Promise<CartItem[]> => {
    const response = await getCart();
    return response.data;
  }
);

export const addToCartAction = thunkWrapper(
  ADD_CART_ITEM,
  async (productId: number): Promise<CartItem> => {
    const response = await addToCart(productId);
    return response.data;
  }
);
export const removeCartItemAction = thunkWrapper(
  DELETE_CART_ITEM,
  async (cartItem: CartItem) => {
    await removeCartItem(cartItem.id);
    return cartItem.product.id;
  }
);

export const updateCartItemAction = thunkWrapper(
  UPDATE_CART_ITEM,
  async ({
    cartItemId,
    quantity,
  }: {
    cartItemId: number;
    quantity: number;
  }): Promise<CartItem> => {
    const response = await updateCartItem(cartItemId, quantity);
    return response.data;
  }
);

export const clearCartAction = thunkWrapper(CLEAR_CART, async () => {
  await clearCart();
  return [];
});
