import { CartItem } from './cart';

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  shippingDetails: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string;
}