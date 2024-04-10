import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import {
  selectCategories,
  selectCategory,
  selectCategoryLoading,
} from "../store/category/categorySlice";
import { fetchCategories } from '../store/category/categoryActions';


export default function CustomizedInputsStyled() {
	const loading = useSelector(selectCategoryLoading);
	const dispatch: Dispatch<any> = useDispatch();
	const selectedCategories = useSelector(selectCategories);
	const [category, setCategory] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

	React.useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>
	}
    

    return (
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}
          onChange={handleChange}
          autoWidth
          label="Category"
        >
			<MenuItem value="">
				<em>None</em>
			</MenuItem>
			{selectedCategories.map((category, index) => {
				return(
					<MenuItem value={index}>{category.name}</MenuItem>
				)
			})}
        </Select>
      </FormControl>
    );
}