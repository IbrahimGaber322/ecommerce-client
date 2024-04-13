import { Container, styled } from "@mui/material";
import OrderCard from "../components/OrderCard";
import { useAppDispatch } from "../hooks/redux";
import { Dispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { selectOrders, selectProductLoading } from "../store/order/OrderSlicer";
import { fetchOrders } from "../store/order/orderActions";
import Order from "../interfaces/Order";

const StyledOrderCard = styled(OrderCard)({
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  borderRadius: 8, 
});
export default function Orders() {
  const dispatch: Dispatch<Order> = useAppDispatch();
  const orders: Order[]|null = useSelector(selectOrders);
  const loading: boolean = useSelector(selectProductLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: "1rem", mb: "4rem" }}>
    {orders?.map((order) => (
      <StyledOrderCard key={order.id} order={order} />
    ))}
  </Container>
  );
}
