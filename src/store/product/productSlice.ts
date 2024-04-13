import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchPopularProducts,
  fetchProductById,
  searchProductsAction,
  addReviewToProductAction,
} from "./productActions";
import Product from "../../interfaces/Product";

interface ProductState {
  products: Product[];
  popularProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}
interface State {
  product: ProductState;
}

const initialState: ProductState = {
  products: [],
  popularProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });

    // Fetch popular products
    builder.addCase(fetchPopularProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPopularProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.popularProducts = action.payload;
    });
    builder.addCase(fetchPopularProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch popular products";
    });

    // Fetch product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product by ID";
    });

    // Search products
    builder.addCase(searchProductsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(searchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to search products";
    });

    // Add review to product
    builder.addCase(addReviewToProductAction.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addReviewToProductAction.fulfilled, (state, action) => {
      state.loading = false;

      if (state.selectedProduct) {
        state?.selectedProduct?.reviews?.push(action.payload);
      }
    });
    builder.addCase(addReviewToProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add review to product";
    });
  },
});

export default productSlice.reducer;

// Selectors
export const selectProducts = (state: State) => state.product.products;
export const selectPopularProducts = (state: State) =>
  state.product.popularProducts;
export const selectProduct = (state: State) => state.product.selectedProduct;
export const selectProductLoading = (state: State) => state.product.loading;
export const selectProductError = (state: State) => state.product.error;
