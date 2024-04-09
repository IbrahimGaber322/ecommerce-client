import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getPopularProducts, getProductById, searchProducts, addReviewToProduct } from "./productApi";
import {
  FETCH_PRODUCTS,
  FETCH_POPULAR_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  SEARCH_PRODUCTS,
  ADD_REVIEW_TO_PRODUCT,
} from "../../constants/actionTypes";
// import Product from "../../interfaces/Product";

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  FETCH_PRODUCTS,
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

// Thunk to fetch popular products
export const fetchPopularProducts = createAsyncThunk(
  FETCH_POPULAR_PRODUCTS,
  async () => {
    const response = await getPopularProducts();
    return response.data;
  }
);

// Thunk to fetch product by ID
export const fetchProductById = createAsyncThunk(
  FETCH_PRODUCT_BY_ID, // Using the constant as the first argument
  async (productId: number) => {
    const response = await getProductById(productId);
    // console.log(response.data)
    return response.data;
  }
);
// Thunk to search products
export const searchProductsAction = createAsyncThunk(
  SEARCH_PRODUCTS,
  async (searchData: any) => {
    const response = await searchProducts(searchData);
    return response.data;
  }
);

// Thunk to add review to a product
export const addReviewToProductAction = createAsyncThunk(
  ADD_REVIEW_TO_PRODUCT,
  async (payload: { productId: number, reviewData: any }) => {
    const { productId, reviewData } = payload;
    const response = await addReviewToProduct(productId, reviewData);
    return response.data;
  }
);