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
} from "./orderActions";
import Order from "../../interfaces/Order";
import { toast } from "react-toastify";

interface OrderState {
  order: Order[] | null;
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
  count: number;
}
interface State {
  order: OrderState;
}

const initialState: OrderState = {
  order: null,
  selectedOrder: null,
  loading: false,
  error: null,
  count: 0,
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
      state.order = action.payload.results;
      state.count = action.payload.count;
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
      toast.success("Order Created Successfully", { position: "bottom-left" });
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
      toast.info("Order Cancelled", { position: "bottom-left" });
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
  },
});

export default orderSlice.reducer;

// Selectors
export const selectOrders = (state: State) => state.order.order;
export const selectOrder = (state: State) => state.order.selectedOrder;
export const selectProductLoading = (state: State) => state.order.loading;
export const selectProductError = (state: State) => state.order.error;
export const selectOrderCount = (state: State) => state.order.count;
