import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch } from "../../hooks/redux";
import { useSelector } from "react-redux";
import {
  selectPopularProducts,
  selectProductLoading,
} from "../../store/product/productSlice";
import { fetchPopularProducts } from "../../store/product/productActions";
import ProductCard from "../product/ProductCard";
import { Box } from "@mui/material";
import Loading from "../../pages/Loading";
import responsive from "./responsive";

export default function ProductCarosoul() {
  const dispatch = useAppDispatch();
  const popularProducts = useSelector(selectPopularProducts);
  const loading = useSelector(selectProductLoading);
  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        width: "75%",
        margin: "auto",
        marginTop: "1rem",
      }}
    >
      <Carousel responsive={responsive} infinite={true}>
        {popularProducts?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </Carousel>
    </Box>
  );
}
