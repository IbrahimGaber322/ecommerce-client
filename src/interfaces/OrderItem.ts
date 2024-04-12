import Product from './Product'
interface CartItem {
    id:number;
    order: number;
    quantity:number;
    product: Product;
    name:string;     
  }

export default CartItem;