import Image from './Image';
import Product from './Product'
interface CartItem {
    id:number;
    cart: number;
    quantity:number;
    product: Product;       
    image:Image;
    name:string;  
    desc:string; 
  }

export default CartItem;