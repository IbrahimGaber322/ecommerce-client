/* Auth */
export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const REFRESHTOKEN = "auth/refreshToken";
export const USERDATA = "auth/userData";
export const LOGOUT = "auth/logout";
export const RESET_PASSWORD = "auth/resetPassword";
export const SEND_RESET_PASSWORD = "auth/sendResetPassword";
export const VERIFY_EMAIL = "auth/verifyEmail";
export const SEND_VERIFY_EMAIL = "auth/sendVerifyEmail";
export const EDIT_USER = "auth/editUser";

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
export const CLEAR_CART = "/cart/clear";

/* Category */
export const FETCH_CATEGORIES = "/category";
export const FETCH_CATEGORY_BY_ID = "/category/:id";
export const SEARCH_CATEGORIES = "/category/search";

/* WishList */
export const GET_WISHLIST = "/wish_list";
export const ADD_WISHLIST_ITEM = "/wish_list/add";
export const DELETE_WISHLIST_ITEM = "/wish_list/delete";

/* Order */
export const FETCH_ORDERS = "/order";
export const FETCH_ORDER_BY_ID = "/order/:id";
export const ADD_ORDER = "/order/add";
export const DELETE_ORDER = "/order/delete";
export const CANCEL_ORDER = "/order/:id/cancel";
export const UPDATE_ORDER = "/order/update";

/* Order Item*/
export const ADD_ORDER_ITEM = "/order/item/orderitems/add";
export const DELETE_ORDER_ITEM = "/order/item/orderitems/delete";