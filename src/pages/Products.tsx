import { useEffect, useMemo } from "react";
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

export default function Products() {
  const loading = useSelector(selectProductLoading);
  const dispatch: Dispatch<any> = useDispatch();
  const selectedProducts = useSelector(selectProducts);
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  useEffect(() => {
    const paramsData = {
      name: searchParams.get("name") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("min_price") || undefined,
      maxPrice: searchParams.get("max_price") || undefined,
      minRating: searchParams.get("min_rating") || undefined,
      maxRating: searchParams.get("max_rating") || undefined,
    };
    dispatch(searchProductsAction(paramsData));
  }, [dispatch, searchParams]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ProductsSidebar />
      <Grid container spacing={3} sx={{ padding: "30px" }}>
        {selectedProducts.map((product, index) => {
          return (
            <Grid key={product.id} item xs={3}>
              <ProductCard key={index} product={product} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
