import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useSelector } from "react-redux";
import QuantityButton from "../ui/QuantityButton";
import Product from "../../interfaces/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { selectCartItems } from "../../store/cart/cartSlice";
import {
  addToCartAction,
  removeCartItemAction,
} from "../../store/cart/cartActions";
import { addToWishListAction } from "../../store/wishList/wishListAction";
import { Box, Button, IconButton, Rating } from "@mui/material";
import { Delete, ShoppingCart } from "@mui/icons-material";
import { addRatingToProductAction } from "../../store/product/productActions";


interface DescriptionProps {
  quant: number;
  addQuant: () => void;
  removeQuant: () => void;
  setQuant: React.Dispatch<React.SetStateAction<number>>;
  product: Product | null;
}

const Description: React.FC<DescriptionProps> = ({
  quant,
  addQuant,
  removeQuant,
  setQuant,
  product,
}) => {
  const dispatch = useAppDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems[product?.id || 0];

  const addToWishlist = (id: number | null) => {
    dispatch(addToWishListAction(id));
  };

  const handleAddToCart = () => {
    dispatch(addToCartAction(product?.id));
    setQuant(1);
  };

  const handleDelete = () => {
    dispatch(removeCartItemAction(cartItem));
  };

  const handleRate = (rate: number) => {
    dispatch(addRatingToProductAction(product?.id, rate))
  };

  return (
    <section className="description">
      <div className="product-name">
        <h1>{product?.name}</h1>
      </div>
      <p className="desc">{product?.description}</p>
      <div
        className="price"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="main-tag">
          <p>{product?.price} $</p>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
        }}
      >
        {cartItems[product?.id || 0] && (
          <QuantityButton
            onQuant={quant}
            onRemove={removeQuant}
            onAdd={addQuant}
          />
        )}
        {!cartItems[product?.id || 0] && (
          <IconButton color="primary" onClick={handleAddToCart}>
            <ShoppingCart />
            add to cart
          </IconButton>
        )}
        {cartItems[product?.id || 0] && (
          <IconButton
            sx={{ color: "red", borderRadius: 0 }}
            onClick={handleDelete}
          >
            Delete from cart
            <Delete />
          </IconButton>
        )}
      </Box>
      <Box>
        <Rating name="half-rating" value={0} precision={0.5} 
        onChange={(event, value) => {
          handleRate(value!)
        }}/>
        
      </Box>
      <div className="product-additional-info pt-25">
        <Button
          className="wishlist-btn"
          id="icon-space"
          onClick={() => addToWishlist(product?.id ?? null)}
        >
          <FontAwesomeIcon icon={farHeart} className="icon-space" /> Add to
          wishlist
        </Button>
      </div>
     
    </section>
  );
};

export default Description;
