import * as React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';

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
  },
);

export default function FormattedInputs() {
  const [minPrice, setMinPrice] = React.useState({
    numberformat: undefined,
  });
  const [maxPrice, setMaxPrice] = React.useState({
    numberformat: undefined,
  });

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice({
      ...minPrice,
      [event.target.name]: event.target.value,
    });
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice({
      ...maxPrice,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        label="min-price"
        value={minPrice.numberformat}
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
        value={maxPrice.numberformat}
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
