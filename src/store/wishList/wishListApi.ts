import { AxiosPromise } from "axios";
import api from "../../api";
import WishList from "../../interfaces/WishList";
import WishListItem from "../../interfaces/WishListItem";

export const getWishList = (): AxiosPromise<WishList> => {
  return api.get("/wish_list/");
};

export const addToWishList = (productId: number): AxiosPromise<WishListItem> => {
  return api.post(
    "/wish_list/",
    { product: productId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const removeWishListItem = (WishListItem: number) => {
  return api.delete(`/wish_list/${WishListItem}/`);
};

