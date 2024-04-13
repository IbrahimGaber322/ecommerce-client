import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,
  fetchOrderById,
  addOrderAction,
  addOrderItemAction,
  updateOrderAction,
  deleteOrderAction,
  deleteOrderItemAction,
  cancelOrderAction,
  checkoutOrderAction,
} from "./orderActions";
import Order from "../../interfaces/Order";
import OrderItem from "../../interfaces/OrderItem";

interface OrderState {
  orderItems: OrderItem[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}
interface State {
  order: OrderState;
}

const initialState: OrderState = {
  orderItems: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderItems = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch all orders";
    });

    // Add order
    builder.addCase(addOrderAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addOrderAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add order";
    });

    // Fetch order by ID
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedOrder = action.payload;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch order by ID";
    });

    // update products
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update order";
    });

    builder.addCase(deleteOrderAction.pending, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteOrderAction.fulfilled, (state, action) => {
      state.loading = false;

    });
    builder.addCase(deleteOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete order";
    });


    builder.addCase(cancelOrderAction.pending, (state) => {
        state.loading = false;
        state.error = null;
    });
    builder.addCase(cancelOrderAction.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(cancelOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to cancel order";
    });


    builder.addCase(addOrderItemAction.pending, (state) => {
        state.loading = false;
        state.error = null;
    });
    builder.addCase(addOrderItemAction.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(addOrderItemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add order item";
    });


    builder.addCase(deleteOrderItemAction.pending, (state) => {
        state.loading = false;
        state.error = null;
    });
    builder.addCase(deleteOrderItemAction.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(deleteOrderItemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete order item";
    });

    builder.addCase(checkoutOrderAction.pending, (state) => {
        state.loading = false;
        state.error = null;
    });
    builder.addCase(checkoutOrderAction.fulfilled, (state, action) => {
        state.loading = false;
    });
    builder.addCase(checkoutOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to checkout order";
    });

  },
});

export default orderSlice.reducer;

// Selectors
export const selectOrders = (state: State) => state.order.orderItems;
export const selectOrder = (state: State) => state.order.selectedOrder;
export const selectProductLoading = (state: State) => state.order.loading;
export const selectProductError = (state: State) => state.order.error;
