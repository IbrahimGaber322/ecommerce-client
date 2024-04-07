import { axiosInstance } from "./config"

export const getProducts = () => {
    return axiosInstance.get('/product/')
}

export const getPopularProducts = () => {
    return axiosInstance.get('/product/popular_products');
}

export const getProductById = (productId) => {
    return axiosInstance.get(`/product/${productId}/`);
}

export const searchProducts = (data) => {
    const { name = '', category = '', minPrice = '', maxPrice = '', minRating = '', maxRating = '' } = data;
    return axiosInstance.get(`/product/?name=${name}&category=${category}&price_gt=${minPrice}&price_lt=${maxPrice}&rate_gt=${minRating}&rate_lte=${maxRating}`);
}
// Add review 
export const addReviewToProduct = (productId, reviewData) => {
    // {"content":[{'content is good ': }]}
    const data = {'content':reviewData}
    return axiosInstance.post(`/product/${productId}/review/`, data);
}

