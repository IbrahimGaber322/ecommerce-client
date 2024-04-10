import { thunkWrapper } from "../thunkWrapper";
import { getCart, addToCart, removeCartItem, updateCartItem } from "./cartApi";
import {
  GET_CART,
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM,
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
  async (itemId: number) => {
    await removeCartItem(itemId);
    return itemId;
  }
);

export const updateCartItemAction = thunkWrapper(
  UPDATE_CART_ITEM,
  async ({cartItemId, quantity}:{cartItemId: number, quantity: number}): Promise<CartItem> => {
    console.log("CartItemIdAction: ", cartItemId);
    console.log("QuantityAction: ", quantity);
    const response = await updateCartItem(cartItemId, quantity);
    return response.data;
  }
);
