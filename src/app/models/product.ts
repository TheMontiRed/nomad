import { Category } from './category';

export interface Product {
  product: string;
  quantity: number;
  imageUrl: string;
  description: string;
  category: Category,
}
