import OrderItem from "./OrderItem";
interface Order {
  orderItems: OrderItem[];
  orderTotalQuantity: number;
  orderTotalAmount: number;
  startingDate: Date;
  deliveryDate: Date;
  status: string;
  
}

export default Order;
