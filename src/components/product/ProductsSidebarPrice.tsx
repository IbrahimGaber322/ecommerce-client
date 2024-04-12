import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { Query } from "../../pages/Products";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

export default function FormattedInputs({
  query,
  setQuery,
}: {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}) {
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      minPrice: event.target.value,
    });
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      maxPrice: event.target.value,
    });
  };

  return (
    <>
      <TextField
        label="min-price"
        value={query.minPrice}
        onChange={handleMinPriceChange}
        name="numberformat"
        id="minprice"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
      <TextField
        label="max-price"
        value={query.maxPrice}
        onChange={handleMaxPriceChange}
        name="numberformat"
        id="maxprice"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
    </>
  );
}
