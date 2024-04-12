import { AxiosPromise } from "axios";
import api from "../../api";
import CartItem from "../../interfaces/CartItem";

export const getCart = (): AxiosPromise<CartItem[]> => {
  return api.get("/cart/");
};

export const addToCart = (productId: number): AxiosPromise<CartItem> => {
  return api.post(
    "/cart/",
    { product: productId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const removeCartItem = (cartItemId: number) => {
  return api.delete(`/cart/${cartItemId}/`);
};

export const updateCartItem = (
  cartItemId: number,
  quantity: number
): AxiosPromise<CartItem> => {
  return api.patch(`/cart/${cartItemId}/`, { quantity });
};

export const clearCart = () => {
  return api.delete("/cart/clear  /");
};