import React, { FC } from "react";
import "react-rater/lib/react-rater.css";
import ProductDetailItem from "../pages/ProductDetailItem";

const ProductDetail: FC = () => {
  const productId = 4;
  return (
      <ProductDetailItem productId ={productId}/>
  );
};

export default ProductDetail;
