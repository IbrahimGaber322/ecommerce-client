import OrderItem from "./OrderItem";

interface Order {
  id: number;
  starting_date: Date;
  delivery_date: Date;
  total_price: number;
  status: string;
  user: number;
  items: OrderItem[];
  address: string;
  address_name: string;
  address_mobile: string;
  address_desc: string;
}

export default Order;