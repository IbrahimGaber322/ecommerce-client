import { thunkWrapper } from "../thunkWrapper";
import {
  getProducts,
  getPopularProducts,
  getProductById,
  searchProducts,
  addReviewToProduct,
} from "./productApi";
import {
  GET_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  CANCEL_ORDER,
  ADD_ORDER_ITEM,
  DELETE_ORDER_ITEM,
} from "../../constants/actionTypes";
// import Product from "../../interfaces/Product";

// Thunk to fetch all products
export const fetchProducts = thunkWrapper(FETCH_PRODUCTS, async () => {
  const response = await getProducts();
  return response.data;
});

// Thunk to fetch popular products
export const fetchPopularProducts = thunkWrapper(
  FETCH_POPULAR_PRODUCTS,
  async () => {
    const response = await getPopularProducts();
    return response.data;
  }
);

// Thunk to fetch product by ID
export const fetchProductById = thunkWrapper(
  FETCH_PRODUCT_BY_ID, // Using the constant as the first argument
  async (productId: number) => {
    const response = await getProductById(productId);
    return response.data;
  }
);
// Thunk to search products
export const searchProductsAction = thunkWrapper(
  SEARCH_PRODUCTS,
  async (searchData: any) => {
    const response = await searchProducts(searchData);
    return response.data;
  }
);

// Thunk to add review to a product
export const addReviewToProductAction = thunkWrapper(
  ADD_REVIEW_TO_PRODUCT,
  async (payload: { productId: number; reviewData: any }) => {
    const { productId, reviewData } = payload;
    const response = await addReviewToProduct( productId, reviewData);
    return response.data;
  }
);
