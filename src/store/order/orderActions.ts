import { thunkWrapper } from "../thunkWrapper";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
  addOrderItem,
  deleteOrderItem,
} from "./orderApi";
import {
  FETCH_ORDERS,
  FETCH_ORDER_BY_ID,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  CANCEL_ORDER,
  ADD_ORDER_ITEM,
  DELETE_ORDER_ITEM,
} from "../../constants/actionTypes";
import OrderItem from "../../interfaces/OrderItem";
// import Product from "../../interfaces/Product";

// Thunk to fetch all orders
export const fetchOrders = thunkWrapper(FETCH_ORDERS, async (page:string) => {
  const response = await getOrders(page);
  return response.data;
});

// Thunk to add order
export const addOrderAction = thunkWrapper(
  ADD_ORDER,
  async (order: {
    address: string;
    address_name: string;
    address_mobile: string;
    address_desc: string;
  }) => {
    const response = await addOrder(order);
    return response.data;
  }
);

// Thunk to fetch order by ID
export const fetchOrderById = thunkWrapper(
  FETCH_ORDER_BY_ID, // Using the constant as the first argument
  async (orderId: number) => {
    const response = await getOrderById(orderId);
    return response.data;
  }
);

// Thunk to delete order by ID
export const deleteOrderAction = thunkWrapper(
  DELETE_ORDER, // Using the constant as the first argument
  async (orderId: number) => {
    const response = await deleteOrder(orderId);
    return response.data;
  }
);

// Thunk to update order by ID
export const updateOrderAction = thunkWrapper(
  UPDATE_ORDER, // Using the constant as the first argument
  async (orderId: number, status: string) => {
    const response = await updateOrder(orderId, status);
    return response.data;
  }
);

// Thunk to cancel order by ID
export const cancelOrderAction = thunkWrapper(
  CANCEL_ORDER, // Using the constant as the first argument
  async (orderId: number) => {
    const response = await cancelOrder(orderId);
    return response.data;
  }
);

// Thunk to add order
export const addOrderItemAction = thunkWrapper(
  ADD_ORDER_ITEM,
  async (orderItem: OrderItem) => {
    const response = await addOrderItem(orderItem);
    return response.data;
  }
);

export const deleteOrderItemAction = thunkWrapper(
  DELETE_ORDER_ITEM, // Using the constant as the first argument
  async (orderItemId: number) => {
    const response = await deleteOrderItem(orderItemId);
    return response.data;
  }
);
