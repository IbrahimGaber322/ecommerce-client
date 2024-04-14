import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoryLoading,
} from "../../store/category/categorySlice";
import { fetchCategories } from "../../store/category/categoryActions";
import Loading from "../../pages/Loading";
import { Query } from "../../pages/Products";
import { useAppDispatch } from "../../hooks/redux";
import capitalizeFirst from "../../util/capitalizeFirst";

export default function CustomizedInputsStyled({
  query,
  setQuery,
}: {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}) {
  const loading = useSelector(selectCategoryLoading);
  const dispatch = useAppDispatch();
  const selectedCategories = useSelector(selectCategories);

  const categoryQueryIndex = React.useMemo(() => {
    const index = selectedCategories.findIndex(
      (selectedCategory) => selectedCategory.name === query.category
    );
    return String(index);
  }, [query, selectedCategories]);

  const handleChange = (event: SelectChangeEvent) => {
    const index = Number(event.target.value);
    setQuery({
      ...query,
      category: selectedCategories[index]?.name || "",
    });
  };

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={categoryQueryIndex}
        onChange={handleChange}
        autoWidth
        label="Category"
      >
        <MenuItem value="-1">
          <em>None</em>
        </MenuItem>
        {selectedCategories.map((category, index) => {
          return (
            <MenuItem key={index} value={index}>
              {capitalizeFirst(category.name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
