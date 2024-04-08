import Image from './Image'
import Review from './Review'
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: number; 
    categoryName:string;
    images: Image[];
    reviews?: Review[];
    average_rate: number;
    total_rates: number;
  }

export default Product;