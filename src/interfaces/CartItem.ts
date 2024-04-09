import Product from './Product'
interface CartItem {
    id:number;
    cart: number;
    quantity:number;
    product: Product;          
  }

export default CartItem;