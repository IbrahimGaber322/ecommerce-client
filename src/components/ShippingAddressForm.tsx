import { useAppDispatch } from "../hooks/redux";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { addAddress } from "../store/address/addressActions";

interface AddressForm {
  address: string;
  mobile_number: string;
  desc: string;
}
export default function ShippingAddressForm() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      address: "",
      mobile_number: "",
      desc: "",
    },
  });

  const onSubmit: SubmitHandler<AddressForm> = (data) => {
    dispatch(addAddress(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Shipping Info</h1>
        <div>
          <Controller
            name="mobile_number"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: "Not a valid phone number",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                helperText={fieldState.error ? fieldState.error?.message : null}
                error={!!fieldState.error}
                label="Phone Number"
                variant="outlined"
                margin="dense"
              />
            )}
          ></Controller>
        </div>
        <div>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                helperText={fieldState.error ? fieldState.error?.message : null}
                error={!!fieldState.error}
                label="Address"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            )}
          ></Controller>
        </div>

        <div>
          <Controller
            name="desc"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                helperText={fieldState.error ? fieldState.error?.message : null}
                error={!!fieldState.error}
                label="Description"
                variant="outlined"
                margin="dense"
                rows={5}
                fullWidth
              />
            )}
          ></Controller>
        </div>

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </>
  );
}
