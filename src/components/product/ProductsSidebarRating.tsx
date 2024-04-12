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
        maxLength={1}
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
  const handleMinRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      minRating: event.target.value,
    });
  };
  const handleMaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      maxRating: event.target.value,
    });
  };

  return (
    <>
      <TextField
        sx={{ marginTop: "20px" }}
        label="min-rate"
        value={query.minRating}
        onChange={handleMinRateChange}
        name="numberformat"
        id="minrate"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
      <TextField
        label="max-rate"
        value={query.maxRating}
        onChange={handleMaxRateChange}
        name="numberformat"
        id="maxrate"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
    </>
  );
}
