import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Gallery from "./Gallery";
import Description from "./Description";
import { Container } from "@mui/material";
import { fetchProductById } from "../../store/product/productActions";
import {
  selectProduct,
  selectProductLoading,
} from "../../store/product/productSlice";
import MobileGallery from "./MobileGallery";
import {
  selectCartItemId,
  selectCartItemQuantity,
} from "../../store/cart/cartSlice";
import type { RootState } from "../../store";
import { updateCartItemAction } from "../../store/cart/cartActions";
import { debounce } from "lodash";
import ReviewComponent from "../Review";

const ProductDetailItem: React.FC<{ productId: number }> = ({ productId }) => {
  const loading = useSelector(selectProductLoading);
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

  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  useEffect(() => {
    const debouncedUpdateCartItem = debounce(() => {
      dispatch(updateCartItemAction({ cartItemId, quantity: quant }));
    }, 1000);

    debouncedUpdateCartItem();

    return () => {
      debouncedUpdateCartItem.cancel();
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
          product={selectedProduct}
        />
      </div>
      {selectedProduct && selectedProduct.reviews && (
     <ReviewComponent reviews={selectedProduct?.reviews} productId={selectedProduct.id}></ReviewComponent>
      )}
    </Container>
  );
};

export default ProductDetailItem;
