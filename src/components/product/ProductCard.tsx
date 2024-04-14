import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { addToCartAction } from "../../store/cart/cartActions";
import { addToWishListAction } from "../../store/wishList/wishListAction";
import { useAppDispatch } from "../../hooks/redux";
import Product from "../../interfaces/Product";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cartSlice";
import { useMemo } from "react";
import { selectWishList } from "../../store/wishList/wishListSlicer";
import { selectUser } from "../../store/auth/authSlice";
export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const cartItems = useSelector(selectCartItems);
  const wishList = useSelector(selectWishList);
  const currUser = useSelector(selectUser);
  const navigate = useNavigate();

  const productInWishList: boolean = useMemo(
    () => wishList.some((item) => item.product.id === product.id),
    []
  );
  const productIncart: boolean = useMemo(
    () => (cartItems[product.id] == undefined ? false : true),
    [cartItems, product]
  );

  const addProductToCart = (productId: Number) => {
    dispatch(addToCartAction(productId));
  };
  const addProductToWishList = (productId: Number) => {
    dispatch(addToWishListAction(productId));
  };
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Link to={{ pathname: `/products/${product.id}` }}>
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]?.image_url}
          sx={{ objectFit: "contain" }}
        />
      </Link>

      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div" noWrap>
          <Tooltip title={product.name}>
            <span>{product.name}</span>
          </Tooltip>
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography
          sx={{ marginTop: "10px", color: "green", fontWeight: "bold" }}
        >
          ${product.price}
        </Typography>
        <Typography
          sx={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <span style={{ color: "rgba(0,0,0,0.7)", fontWeight: "bold" }}>
            {product.total_rates}
          </span>
          <Rating
            sx={{
              marginLeft: "10px",
            }}
            name="half-rating-read"
            value={product.average_rate}
            precision={0.5}
            readOnly
          />
        </Typography>
      </CardContent>
      <CardActions>
        {!productIncart && (
          <Button
            size="small"
            variant={"contained"}
            startIcon={<ShoppingCartIcon />}
            onClick={() => {
              if (currUser) {
                addProductToCart(product.id);
              } else {
                navigate('/login');
              }
            }}
          >
            Add to Cart
          </Button>
        )}
        {!productInWishList && (
          <Button
            size="large"
            startIcon={<FavoriteBorderIcon />}
            onClick={() => {
              if (currUser) {
                addProductToWishList(product.id);
              } else {
                navigate('/login');
              }
            }}
          ></Button>
        )}
      </CardActions>
    </Card>
  );
}
