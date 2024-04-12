import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Gallery from "./Gallery";
import Description from "./Description";
import { Container } from "@mui/material";
import { fetchProductById } from "../../store/product/productActions";
import {
  selectProduct,
  selectProductLoading,
} from "../../store/product/productSlice";
import MobileGallery from "./MobileGallery";
import { selectCartItems } from "../../store/cart/cartSlice";
import { updateCartItemAction } from "../../store/cart/cartActions";
import { debounce } from "lodash";
import { useAppDispatch } from "../../hooks/redux";

const ProductDetailItem: React.FC<{ productId: number }> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const productLoading = useSelector(selectProductLoading);
  const cartItems = useSelector(selectCartItems);
  const selectedProduct = useSelector(selectProduct);

  const cartItem = cartItems[productId];
  const cartItemId = cartItem?.id || 0;
  const cartItemQuantity = cartItem?.quantity || 0;

  const [quant, setQuant] = useState<number>(cartItemQuantity);
  const [changed, setChanged] = useState<boolean>(false);

  const addQuant = () => {
    setChanged(true);
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setChanged(true);
    if (quant > 1) {
      setQuant(quant - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!changed) return;
    const debouncedUpdateCartItem = debounce(() => {
      dispatch(updateCartItemAction({ cartItemId, quantity: quant }));
    }, 1000);
    if (cartItemId > 0) {
      debouncedUpdateCartItem();
    }
    return () => {
      debouncedUpdateCartItem.cancel();
    };
  }, [quant, dispatch, cartItemId, changed]);
  if (productLoading) return <h2>Loading...</h2>;
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
          setQuant={setQuant}
          product={selectedProduct}
        />
      </div>
    </Container>
  );
};

export default ProductDetailItem;
