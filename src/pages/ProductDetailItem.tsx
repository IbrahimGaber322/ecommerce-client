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
import {
  selectCartItemId,
  selectCartItemQuantity,
  selectCartItems,
} from "../store/cart/cartSlice";
import type { RootState } from "../store";
import { updateCartItemAction } from "../store/cart/cartActions";
import { debounce } from "lodash";

const ProductDetailItem: React.FC<{ productId: number }> = ({ productId }) => {
  const loading = useSelector(selectProductLoading);
  const cartItems = useSelector(selectCartItems);
  const cartItemId = useSelector((state: RootState) =>
    selectCartItemId(state, productId)
  );
  const cartItemQuantity = useSelector((state: RootState) =>
    selectCartItemQuantity(state, productId)
  );
  const dispatch: Dispatch<any> = useDispatch();
  const selectedProduct = useSelector(selectProduct);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const [quant, setQuant] = useState<number>(cartItemQuantity);
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

  useEffect(() => {
    const debouncedUpdateCartItem = debounce(() => {
      console.log("Updating cart item", quant);
      dispatch(updateCartItemAction({ cartItemId, quantity: quant }));
    }, 1000); // Adjust the delay as needed

    debouncedUpdateCartItem();

    return () => {
      debouncedUpdateCartItem.cancel(); // Cancel the debounced function
    };
  }, [quant, dispatch, cartItemId]);
  if (loading) return <h2>Loading...</h2>;
  return (
    <Container
      sx={{ overflow: "hidden", height: "fit-content" }}
      component="section"
      maxWidth={"lg"}
    >
      <div className="core" style={{ margin: "3rem" }}>
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
