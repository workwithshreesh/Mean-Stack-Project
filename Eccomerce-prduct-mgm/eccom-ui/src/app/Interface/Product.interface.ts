import { Category } from "./Category.interface";
import { Image } from "./Image.interface";


export interface Product {
  id?: number;
  name: string;
  price: number;
  uniqueId?: string;
  categoryId?: number;
  category?: Category;
  images?: Image[];
  createdAt?: Date;
  updatedAt?: Date;
}
