import { useSelector } from "react-redux";
import { selectAddresses } from "../store/address/addressSlice";
import Address from "../interfaces/Address";
import { useEffect } from "react";
import { getAddresses } from "../store/address/addressActions";
import { useAppDispatch } from "../hooks/redux";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import ShippingAddressForm from "../components/ShippingAddressForm";

interface ShippingAddressForm {
  savedAddress: string;
}
export default function Checkout() {
  const dispatch = useAppDispatch();
  const addresses: Address[] = useSelector(selectAddresses);
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      savedAddress: "",
    },
  });

  const onSubmit: SubmitHandler<ShippingAddressForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FormControl>
              <FormLabel>Choose Shipping Address</FormLabel>
              <RadioGroup name="shipping-address">
                {addresses.map((address) => (
                  <FormControlLabel
                    value={address.id}
                    control={<Radio />}
                    label={address.address}
                    key={address.id}
                    {...register("savedAddress", {
                      required: "Must choose a shipping address",
                    })}
                  />
                ))}
              </RadioGroup>
              {errors.savedAddress && (
                <Typography variant="body2" color="error">
                  {errors.savedAddress.message}
                </Typography> // Display error message
              )}
            </FormControl>
          </Box>
          <Button type="submit" variant="contained">
            Pay
          </Button>
        </form>
        <ShippingAddressForm />
      </Container>
    </>
  );
}
