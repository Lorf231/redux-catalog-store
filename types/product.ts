export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface GetProductsArgs {
  offset: number;
  limit: number;
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number | null;
}