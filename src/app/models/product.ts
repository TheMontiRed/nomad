import { Category } from './category';

export interface Product {
  key: string;
  product: string;
  quantity: number;
  imageUrl: string;
  description: string;
  category: string,
}
