import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
import { Container } from "@mui/material";
import { RootState } from '../store';
// import { selectSelectedProduct, selectLoading, selectError } from '../store/product/productSlice';
import  { fetchProductById }  from '../store/product/productActions';

const ProductDetailItem: React.FC<{ productId : number }> = ({ productId }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const selectedProduct = useSelector((state: RootState) => state.product.selectedProduct);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

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

  return (
    <Container component="section" maxWidth={"lg"}>
      <section className="core">
       <Gallery product={selectedProduct}/>
        {/* <MobileGallery /> */}
        <Description 
          quant={quant}
          addQuant={addQuant}
          removeQuant={removeQuant}
          setOrderedQuant={setOrderedQuant}
          product={selectedProduct}
        />
      </section>
    </Container>
  );
};

export default ProductDetailItem;
