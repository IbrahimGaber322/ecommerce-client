import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  selectCategories,
  selectCategoryLoading,
} from "../../store/category/categorySlice";
import { fetchCategories } from "../../store/category/categoryActions";

export default function CustomizedInputsStyled() {
  const loading = useSelector(selectCategoryLoading);
  const dispatch: Dispatch<any> = useDispatch();
  const selectedCategories = useSelector(selectCategories);
  const [category, setCategory] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
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
          return (
            <MenuItem key={index} value={index}>
              {category.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
