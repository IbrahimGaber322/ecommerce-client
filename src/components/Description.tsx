import React, { Dispatch, useCallback,useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";
import Product from "../interfaces/Product";
import {
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaGooglePlus,
  FaInstagram,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {addToCart} from "../store/cart/cartSlice";
import {addItemToCart} from "../store/cart/cartActions";
import {fetchUserCart} from "../store/cart/cartActions";
import { RootState } from "../store/index";
interface DescriptionProps {
  quant: number;
  addQuant: () => void;
  removeQuant: () => void;
  setOrderedQuant: (quant: number) => void;
  product: Product | null;
}

const Description: React.FC<DescriptionProps> = ({
  quant,
  addQuant,
  removeQuant,
  setOrderedQuant,
  product,
}) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(fetchUserCart());
    
  }, []);

  useEffect(() => {
    console.log(cart)
    
  }, [cart]);
  
  const addToWishlist = () => {
    alert("addToWishlist");
  };

  const memoizedAddToCart = useCallback(
    (product: Product | null) => {
      if (product) {
        dispatch(addToCart(product));
      }
    },
    [dispatch]
  );

  const handleAddToCart = () => {
    memoizedAddToCart(product);
  };
  
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
        <QuantityButton
          onQuant={quant}
          onRemove={removeQuant}
          onAdd={addQuant}
        />
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          <CartIcon />
          add to cart
        </button>
      </div>
      <div className="product-additional-info pt-25">
        <a className="wishlist-btn" href="" id="icon-space">
          <FontAwesomeIcon icon={farHeart} className="icon-space" /> Add to
          wishlist
        </a>
      </div>
    </section>
  );
};

export default Description;
