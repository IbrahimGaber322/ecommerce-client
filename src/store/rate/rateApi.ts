import api from "../../api";

export const fetchAllRates = () => {
    return api.get(`/rate`);
  }
  
  export const addRatingToProduct = (productId: number, rating: number) => {
    return api.post(`/rate/`,  {
      product: productId,
      rate: rating
    });
  };
  
  export const updateRatingForProduct = (rateId: number, rating: number) => {
    return api.patch(`/rate/${rateId}/`,  {
      rate: rating
    });
  };