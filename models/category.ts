import { Product } from './product';

export interface Category {
  title: string;
  products: Product[];
}

// export interface ProductPayload {}

export interface CategoryResponse {
  status?: 'success' | 'failed';
  message?: string;

  categoryList: Category[];
}
