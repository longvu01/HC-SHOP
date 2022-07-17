import { Product, ProductResponse } from '@/models';
import axiosClient from './axiosClient';

const productApi = {
  getAll(): Promise<ProductResponse> {
    const url = '/products';
    return axiosClient.get(url);
  },

  getById(id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data: Product): Promise<Product> {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data: Partial<Product>): Promise<Product> {
    const url = '/';
    return axiosClient.patch(url, data);
  },

  delete(id: string): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
