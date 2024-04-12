import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import { Grid } from "@mui/material";
import {
  selectProducts,
  selectProductLoading,
} from "../store/product/productSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsAction } from "../store/product/productActions";
import ProductsSidebar from "../components/product/ProductsSidebar";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

export interface Query {
  minPrice: string;
  maxPrice: string;
  minRating: string;
  maxRating: string;
  category: string;
}

export default function Products() {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();

  const loading = useSelector(selectProductLoading);
  const selectedProducts = useSelector(selectProducts);

  const categoryParams = useMemo(
    () => ["electronics", "fashion", "books", "toys"],
    []
  );

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currPath = useMemo(
    () => location.pathname.slice(1),
    [location.pathname]
  );
  const category = useMemo(
    () =>
      categoryParams.find(
        (category) =>
          category === currPath || searchParams.get("category") || undefined
      ),
    [currPath, categoryParams, searchParams]
  );

  console.log("Category", category);

  const [query, setQuery] = useState<Query>({
    minPrice: searchParams.get("min_price") || "",
    maxPrice: searchParams.get("max_price") || "",
    minRating: searchParams.get("min_rating") || "",
    maxRating: searchParams.get("max_rating") || "",
    category: searchParams.get("category") || "",
  });

  useEffect(() => {
    currPath !== "/products" && setQuery({ ...query, category: "" });
  }, [currPath]);

  useEffect(() => {
    const paramsData = {
      name: searchParams.get("name") || undefined,
      category,
      minPrice: searchParams.get("min_price") || undefined,
      maxPrice: searchParams.get("max_price") || undefined,
      minRating: searchParams.get("min_rating") || undefined,
      maxRating: searchParams.get("max_rating") || undefined,
    };
    dispatch(searchProductsAction(paramsData));
  }, [dispatch, searchParams, location.pathname, category]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ProductsSidebar query={query} setQuery={setQuery} />
      <Grid container spacing={3} sx={{ padding: "30px" }}>
        {selectedProducts.map((product, index) => {
          return (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <ProductCard key={index} product={product} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
