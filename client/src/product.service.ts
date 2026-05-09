import { API_ENDPOINTS } from "./data";
import type { ProductReadT } from "./schema/product.schema";
import { axiosInstance } from "./axios";

export interface ProductServiceT {
  get: () => Promise<ProductReadT[]>;
  find: (id: number) => Promise<ProductReadT>;
}

export const ProductService: Readonly<ProductServiceT> = Object.freeze({
  async get(): Promise<ProductReadT[]> {
    return axiosInstance
      .get<ProductReadT[]>(API_ENDPOINTS.PRODUCT)
      .then((res) => res.data);
  },

  async find(id: number): Promise<ProductReadT> {
    return axiosInstance
      .get<ProductReadT>(`${API_ENDPOINTS.PRODUCT}/${id}`)
      .then((res) => res.data);
  },
} as const);
