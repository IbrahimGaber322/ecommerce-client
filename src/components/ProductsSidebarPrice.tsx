import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function ProductsSidebarPrice() {
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

	const [minPrice, setMinPrice] = useState({
		numberformat: '0',
	});
	const [maxPrice, setMaxPrice] = useState({
		numberformat: '0',
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
                id="formatted-numberformat-input"
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
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: NumericFormatCustom as any,
                }}
                variant="standard"
            />
		</>
	)
}
