import { thunkWrapper } from "../thunkWrapper";
import {
  getCategories,
  getCategoryById,
  searchCategories,
} from "./categoryApi";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORY_BY_ID,
  SEARCH_CATEGORIES,
} from "../../constants/actionTypes";
// import Category from "../../interfaces/Category";

// Thunk to fetch all categories
export const fetchCategories = thunkWrapper(FETCH_CATEGORIES, async () => {
  const response = await getCategories();
  return response.data;
});

// Thunk to fetch category by ID
export const fetchCategoryById = thunkWrapper(
  FETCH_CATEGORY_BY_ID, // Using the constant as the first argument
  async (categoryId: number) => {
    const response = await getCategoryById(categoryId);
    return response.data;
  }
);
// Thunk to search categories
export const searchCategoriesAction = thunkWrapper(
  SEARCH_CATEGORIES,
  async (searchData: any) => {
    const response = await searchCategories(searchData);
    return response.data;
  }
);
