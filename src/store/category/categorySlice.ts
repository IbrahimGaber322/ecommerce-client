import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCategoryById,
  searchCategoriesAction,
} from "./categoryActions";
import Category from "../../interfaces/Category";

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}
interface State {
  category: CategoryState;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch categories";
    });

    // Fetch product by ID
    builder.addCase(fetchCategoryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCategory = action.payload;
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      console.log("fejected");
      state.loading = false;
      state.error = action.error.message || "Failed to fetch category by ID";
    });

    // Search products
    builder.addCase(searchCategoriesAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(searchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to search products";
    });

  },
});

export default categorySlice.reducer;

// Selectors
export const selectCategories = (state: State) => state.category.categories;
export const selectCategory = (state: State) => state.category.selectedCategory;
export const selectCategoryLoading = (state: State) => state.category.loading;
export const selectCategoryError = (state: State) => state.category.error;
