import { useSelector } from "react-redux";
import { selectAddresses } from "../store/address/addressSlice";
import Address from "../interfaces/Address";
import { useEffect } from "react";
import { getAddresses } from "../store/address/addressActions";
import { useAppDispatch } from "../hooks/redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useForm, SubmitHandler } from "react-hook-form";
import ShippingAddressForm from "../components/ShippingAddressForm";
import { selectCartItems, selectCartTotalAmount } from "../store/cart/cartSlice";
import api from "../api";

interface ShippingAddressForm {
  savedAddress: string;
}

export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const addresses: Address[] = useSelector(selectAddresses);
  const totalAmount = useSelector(selectCartTotalAmount);
  console.log(cartItems);
  console.log(addresses);
  const dispatch = useAppDispatch();
  
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

  const onSubmit = async(data: any) => {
    console.log(data);
    console.log("form",addresses.find((address) => address.id == data.savedAddress));
    const selectedAddress= addresses.find((address) => address.id == data.savedAddress);
    const formData = {
      ...data,
      address: selectedAddress?.address,
      address_mobile: selectedAddress?.mobile_number,
      address_name: selectedAddress?.name,
      total_price: totalAmount,
    };
    await api.post("order/", formData);
    }


  return (
    <>
      <Container maxWidth="lg" sx={{ mt: "1rem" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ marginBottom: "1rem" }}
        >
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

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Add Shipping Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingAddressForm />
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}
