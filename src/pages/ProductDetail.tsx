import React, { FC } from "react";
import "react-rater/lib/react-rater.css";
import ProductDetailItem from "../components/product-detail/ProductDetailItem";
import { useParams } from "react-router-dom";

const ProductDetail: FC = () => {
  const productId = parseInt(useParams().id!);

  return (
      <ProductDetailItem productId ={productId}/>
  );
};

export default ProductDetail;
