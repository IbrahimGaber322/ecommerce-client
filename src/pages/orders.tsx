import { Container } from "@mui/material";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "1 rem" }}>
        <OrderCard></OrderCard>
      </Container>
    </>
  );
}
