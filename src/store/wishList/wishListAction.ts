import { thunkWrapper } from "../thunkWrapper";
import { getWishList, addToWishList, removeWishListItem, } from "./wishListApi";
import {
  GET_WISHLIST,
  ADD_WISHLIST_ITEM,
  DELETE_WISHLIST_ITEM,
} from "../../constants/actionTypes";
import WishList from "../../interfaces/WishList";
import WishListItem from "../../interfaces/WishListItem";

export const getWishListAction = thunkWrapper(
    GET_WISHLIST,
  async (): Promise<WishList> => {
    const response = await getWishList();
    return response.data;
  }
);

export const addToWishListAction = thunkWrapper(
  ADD_WISHLIST_ITEM,
  async (productId: number): Promise<WishListItem> => {
    const response = await addToWishList(productId);
    return response.data;
  }
);
export const removeWishListItemAction = thunkWrapper(
  DELETE_WISHLIST_ITEM,
  async (itemId: number) => {
    await removeWishListItem(itemId);
    return itemId;
  }
);

