/* Auth */

export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const REFRESHTOKEN = "auth/refreshToken";
export const USERDATA = "auth/userData";
export const LOGOUT = "auth/logout";

/* Product */
export const FETCH_PRODUCTS = "/product";
export const FETCH_POPULAR_PRODUCTS = "/product/popular_products";
export const FETCH_PRODUCT_BY_ID = "/product/:id";
export const SEARCH_PRODUCTS = "/product/search";
export const ADD_REVIEW_TO_PRODUCT = "/product/:id/review";

/* Cart */
export const GET_CART = "cart/get";
export const ADD_CART_ITEM = "/cart/add";
export const DELETE_CART_ITEM = "/cart/delete";
export const UPDATE_CART_ITEM = "/cart/update";
