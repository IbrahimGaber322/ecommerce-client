import api from "../../api";
import OrderItem from "../../interfaces/OrderItem";

export const getOrders = (page:string) => {
  return api.get(`/order/?page=${page}`);
};

export const getOrderById = (orderId: number) => {
  return api.get(`/order/${orderId}/`);
};

export const addOrder = (order: {
  address: string;
  address_name: string;
  address_mobile: string;
  address_desc: string;
}) => {
  return api.post("/order/", order);
};

export const cancelOrder = (orderId: number) => {
  return api.post(`/order/${orderId}/cancel_order/`);
};

export const deleteOrder = (orderId: number) => {
  return api.delete(`/order/${orderId}/`);
};

export const updateOrder = (orderId: number, status: string) => {
  return api.patch(`/order/${orderId}/`, status);
};

export const addOrderItem = (orderItem: OrderItem) => {
  return api.post("/items/orderitems/", orderItem);
};

export const deleteOrderItem = (orderItemId: number) => {
  return api.delete(`/items/orderitems/${orderItemId}/`);
};

export const checkoutOrder = () => {
  console.log("WE HERE");
  return api.post(`/order/checkout/`);
};
