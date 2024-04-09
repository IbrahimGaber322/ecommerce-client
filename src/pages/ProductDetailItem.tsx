import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
import { Container } from "@mui/material";
// import { selectSelectedProduct, selectLoading, selectError } from '../store/product/productSlice';
import { fetchProductById } from "../store/product/productActions";
import {
  selectProduct,
  selectProductLoading,
} from "../store/product/productSlice";
import MobileGallery from "../components/MobileGallery";

const ProductDetailItem: React.FC<{ productId: number }> = ({ productId }) => {
  const loading = useSelector(selectProductLoading);
  const dispatch: Dispatch<any> = useDispatch();
  const selectedProduct = useSelector(selectProduct);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const [quant, setQuant] = useState<number>(0);
  const [orderedQuant, setOrderedQuant] = useState<number>(0);
  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };
  if (loading) return <h2>Loading...</h2>;
  return (
    <Container component="section" maxWidth={"lg"}>
      <div className="core">
        <Gallery product={selectedProduct} />
        <MobileGallery product={selectedProduct} />
        <Description
          quant={quant}
          addQuant={addQuant}
          removeQuant={removeQuant}
          setOrderedQuant={setOrderedQuant}
          product={selectedProduct}
        />
      </div>
    </Container>
  );
};

export default ProductDetailItem;
