import {OrderItem} from '../models/OrderItem';

export interface CreateOrderRequest {
  buyerId: number;
  address: string;
  status: string;
  products: OrderItem[];
}
