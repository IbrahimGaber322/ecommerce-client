import CartItem from "./CartItem";
interface Cart {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

export default Cart;
