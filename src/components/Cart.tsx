import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/redux";
import {
  selectCartItems /* , selectCartLoading */,
} from "../store/cart/cartSlice";
import {
  clearCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from "../store/cart/cartActions";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import CartItem from "../interfaces/CartItem";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItemsSelector = useSelector(selectCartItems);
  /*   const loading = useSelector(selectCartLoading); */

  const [cartItems, setCartItems] = useState<{ [key: number]: CartItem }>(
    cartItemsSelector
  );
  const [current, setCurrent] = useState(0);

  const productIds = useMemo(() => Object.keys(cartItems), [cartItems]);
  const cartTotalAmount = useMemo(
    () =>
      Object.values(cartItems)
        .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
        .toFixed(2),
    [cartItems]
  );

  const incrementCartItem = (cartItem: CartItem, inc: number) => {
    const quantity = cartItem.quantity + inc;

    if (quantity <= 0) {
      removeCartItem(cartItem);
    } else {
      setCartItems((prev) => ({
        ...prev,
        [cartItem.product.id]: {
          ...cartItem,
          quantity,
        },
      }));
      setCurrent(cartItem.product.id);
    }
  };

  const removeCartItem = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const { [cartItem.product.id]: removed, ...rest } = prev;
      return rest;
    });
    dispatch(removeCartItemAction(cartItem));
  };

  const clearCart = () => {
    setCartItems({});
    dispatch(clearCartAction());
  };

  useEffect(() => {
    if (current === 0) return;

    const debouncedUpdateCartItem = debounce(
      (cartItemId: number, quantity: number) => {
        dispatch(updateCartItemAction({ cartItemId, quantity }));
      },
      1000
    );
    debouncedUpdateCartItem(cartItems[current]?.id, cartItems[current]?.quantity);

    return () => {
      debouncedUpdateCartItem.cancel();
    };
  }, [current, dispatch, cartItems]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {productIds.length === 0 ? (
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
            {productIds.length > 0 &&
              productIds.map((productId) => {
                const cartItem = cartItems[Number(productId)];
                if (!cartItem) return null;
                return (
                  <div className="cart-item" key={productId}>
                    <div className="cart-product">
                      <img
                        src={cartItem?.image?.image_url}
                        alt={cartItem.name}
                      />
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.desc}</p>
                        <button
                          onClick={() => {
                            removeCartItem(cartItem);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">
                      ${cartItem.product.price}
                    </div>
                    <div className="cart-product-quantity">
                      <button
                        onClick={() => {
                          incrementCartItem(cartItem, -1);
                        }}
                      >
                        -
                      </button>
                      <div className="count">{cartItem.quantity}</div>
                      <button onClick={() => incrementCartItem(cartItem, 1)}>
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-summary">
            <button
              className="clear-btn"
              onClick={() => {
                clearCart();
              }}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <Link to="/checkout">
                <button>Check out</button>
              </Link>
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
