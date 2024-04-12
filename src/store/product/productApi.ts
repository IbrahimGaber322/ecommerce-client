import api from "../../api";

export const getProducts = () => {
  return api.get("/product/");
};

export const getPopularProducts = () => {
  return api.get("/product/popular_products");
};

export const getProductById = (productId: number) => {
  return api.get(`/product/${productId}/`);
};

export const searchProducts = (data: any) => {
  const {
    name = "",
    category = "",
    minPrice = "",
    maxPrice = "",
    minRating = "",
    maxRating = "",
  } = data;
  return api.get(
    `/product/?name=${name}&category=${category}&price_gt=${minPrice}&price_lt=${maxPrice}&rate_gt=${minRating}&rate_lte=${maxRating}`
  );
};
// Add review
export const addReviewToProduct = (productId: number, reviewData: any) => {
  // const data = { content: reviewData };
  console.log(`/product/${productId}/review/`);
  console.log( reviewData);
  return api.post(`/product/${productId}/review/`,  reviewData);
};
