import Product from './Product'
interface OrderItem {
    id:number;
    order: number;
    quantity:number;
    product: Product;
    name:string;     
  }

export default OrderItem;