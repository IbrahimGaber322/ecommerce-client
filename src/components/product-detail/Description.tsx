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
import { Box, Button, IconButton } from "@mui/material";
import { Delete, ShoppingCart } from "@mui/icons-material";
import ProductDetailRate from "./ProductDetailRate";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

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
        <p>{(product?.price)?.toLocaleString('en-EG', { style: 'currency', currency: 'EGP' })}</p>
        </div>
        <div className="main-tag">
           <p style={{ fontSize: '1.2rem' }}>Only {product?.stock} left in stock</p>
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',  
            gap: 1  
          }}
         >avg: 
            <Rating
              name="read-only"
              value={product?.average_rate}
              precision={0.5}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography variant="body2" component="span">
              {product?.total_rates}
            </Typography>
       </Box>

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
      <ProductDetailRate product={product!}/>
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
