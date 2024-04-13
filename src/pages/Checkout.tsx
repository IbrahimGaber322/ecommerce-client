import { useSelector } from "react-redux";
import { selectAddresses } from "../store/address/addressSlice";
import Address from "../interfaces/Address";
import { useEffect } from "react";
import { getAddresses } from "../store/address/addressActions";
import { useAppDispatch } from "../hooks/redux";
import { Container } from "@mui/material";
import ShippingAddressForm from "../components/ShippingAddressForm";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const addresses: Address[] = useSelector(selectAddresses);
  useEffect(() => {
    dispatch(getAddresses());
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "1rem" }}>
        <h1>Checkout Works</h1>
        {addresses.map((address) => (
          <h3 key={address.id}>{address.address}</h3>
        ))}
        <ShippingAddressForm></ShippingAddressForm>
      </Container>
    </>
  );
}
