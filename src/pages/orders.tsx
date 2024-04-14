import { Container, styled } from "@mui/material";
import OrderCard from "../components/OrderCard";
import { useAppDispatch } from "../hooks/redux";
import { Dispatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { selectOrderCount, selectOrders, selectProductLoading } from "../store/order/orderSlicer";
import { cancelOrderAction, fetchOrders } from "../store/order/orderActions";
import Order from "../interfaces/Order";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

const StyledOrderCard = styled(OrderCard)({
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
});
export default function Orders() {
  const dispatch: Dispatch<Order> = useAppDispatch();
  const orders: Order[] | null = useSelector(selectOrders);
  const loading: boolean = useSelector(selectProductLoading);
  const count = useSelector(selectOrderCount);

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchOrders(page.toString()));
  }, [dispatch, page]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("🎉 Order Paid Successfully 🎉", {
        position: "top-center",
      });
    }

    if (query.get("canceled")) {
      if (!orders) return;
      toast.error("⚠ Payment Failed ⚠", { position: "top-center" });
      dispatch(cancelOrderAction(orders.at(-1)?.id));
    }
  }, [dispatch, orders]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: "1rem", mb: "4rem" }}>
      {orders
        ?.slice()
        .reverse()
        .map((order) => (
          <StyledOrderCard key={order.id} order={order} />
        ))}
        <Pagination pages={Math.ceil(count/5)} page={page} setPage={setPage} eventsPerPage={5} eventsNumber={5}  />
    </Container>
  );
}
