import { TextField } from "@mui/material";
import React, { useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function ProductsSidebarRating() {
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

  const [minRating, setMinRating] = useState({
    numberformat: "0",
  });
  const [maxRating, setMaxRating] = useState({
    numberformat: "0",
  });

  const handleMinRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinRating({
      ...minRating,
      [event.target.name]: event.target.value,
    });
  };

  const handleMaxRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxRating({
      ...maxRating,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        sx={{ marginTop: "20px" }}
        label="min-rating"
        value={minRating.numberformat}
        onChange={handleMinRatingChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
      <TextField
        label="max-rating"
        value={maxRating.numberformat}
        onChange={handleMaxRatingChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="standard"
      />
    </>
  );
}
