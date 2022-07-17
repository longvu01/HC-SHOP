import { CategoryResponse, Product } from '@/models';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll(): Promise<CategoryResponse> {
    const url = '/categories';
    return axiosClient.get(url);
  },

  getById(id: string): Promise<Product> {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data: Product): Promise<Product> {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data: Partial<Product>): Promise<Product> {
    const url = '/';
    return axiosClient.patch(url, data);
  },

  delete(id: string): Promise<any> {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
