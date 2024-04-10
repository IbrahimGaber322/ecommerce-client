import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/redux";
import {
  incrementCartItem,
  selectCartItems,
  selectCartTotalAmount,
} from "../store/cart/cartSlice";
import {removeCartItemAction} from "../store/cart/cartActions";
import { RootState } from "../store/index";
import {getCartAction} from "../store/cart/cartActions";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {

const cartItems = useSelector(selectCartItems);
const cartTotalAmount = useSelector(selectCartTotalAmount);

const dispatch = useAppDispatch();


  const handleAddToCart = (product: any) => {
    dispatch(incrementCartItem(product.id));
  };

 /*  const handleDecreaseCart = (product: any) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
    // dispatch(removeCartItemAction(product.id))
  };
  const handleClearCart = () => {
    dispatch(clearCart(""));
  }; */

  return (
   
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems.length>0 &&
              cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image?.image_url} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => {/* handleRemoveFromCart(cartItem) */}}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.product.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => {/* handleDecreaseCart(cartItem) */}}>
                      -
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() =>  handleAddToCart(cartItem.product)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.product.price * cartItem.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => {/* handleClearCart() */}}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
