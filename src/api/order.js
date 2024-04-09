import { axiosInstance } from "./config";

export const getOrders = () => {
    return axiosInstance.get('/order/');
}

export const getOrderById = (orderId) => {
    return axiosInstance.get(`/order/${orderId}/`);
}

export const createOrder = (orderData) => {
    return axiosInstance.post('/order/', orderData);
}

export const updateOrder = (orderId, updatedOrderData) => {
    return axiosInstance.put(`/order/${orderId}/`, updatedOrderData);
}

export const cancelOrder = (orderId) => {
    return axiosInstance.post(`/order/${orderId}/cancel/`);
}