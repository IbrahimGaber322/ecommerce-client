import React, { useMemo } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useSelector } from "react-redux";
import CartIcon from "../Icons/CartIcon";
import QuantityButton from "../ui/QuantityButton";
import Product from "../../interfaces/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { selectCartItems } from "../../store/cart/cartSlice";
import { addToCartAction } from "../../store/cart/cartActions";
import { addToWishListAction } from "../../store/wishList/wishListAction";
import { Button } from "@mui/material";

interface DescriptionProps {
  quant: number;
  addQuant: () => void;
  removeQuant: () => void;
  product: Product | null;
}

const Description: React.FC<DescriptionProps> = ({
  quant,
  addQuant,
  removeQuant,
  product,
}) => {
  const dispatch = useAppDispatch();

  const cartItems = useSelector(selectCartItems);

  const addToWishlist = (id: number | null) => {
    dispatch(addToWishListAction(id));
  };

  const handleAddToCart = () => {
    dispatch(addToCartAction(product?.id));
  };

  const productInCart = useMemo(
    () => cartItems.find((item) => item.product.id === product?.id),
    [cartItems, product?.id]
  );

  return (
    <section className="description">
      <div className="product-name">
        <h1>{product?.name}</h1>
      </div>
      <p className="desc">{product?.description}</p>
      <div className="price">
        <div className="main-tag">
          <p>{product?.price} $</p>
        </div>
      </div>
      <div className="buttons">
        {productInCart && (
          <QuantityButton
            onQuant={quant}
            onRemove={removeQuant}
            onAdd={addQuant}
          />
        )}
        {!productInCart && (
          <button className="add-to-cart" onClick={handleAddToCart}>
            <CartIcon />
            add to cart
          </button>
        )}
      </div>
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
