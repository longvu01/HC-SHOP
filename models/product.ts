export interface Product {
  _id?: any;
  title: string;
  category: string;
  code: string;
  price: Number;
  info: Array<string>;
  description: string;
  checked: boolean;
  comments: Number;
  rating: Number;

  ratingCount?: Number;
  ratingValue?: Number;

  inStock: Number;
  sold: Number;
  images?: Array<{ public_id: string; url: string }>;
}

export interface ProductPayload {}

export interface ProductResponse {
  status: 'success' | 'failed';
  message?: string;
  total: number;

  products: Product | Product[];
}
