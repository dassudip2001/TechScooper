import { axiosInstance } from "@/lib/axios"
import type {
  CreateProductInput,
  ProductReadT,
  UpdateProductInput,
} from "@/schema/product.schema"
import { API_ENDPOINTS } from "./data"

export interface ProductServiceT {
  get: (keyword: string) => Promise<ProductReadT[]>
  find: (id: number) => Promise<ProductReadT>
  create: (data: CreateProductInput) => Promise<string>
  update: (id: number, data: UpdateProductInput) => Promise<string>
  delete: (id: number) => Promise<void>
}

export const ProductService: Readonly<ProductServiceT> = Object.freeze({
  async get(keyword: string): Promise<ProductReadT[]> {
    return axiosInstance
      .get<ProductReadT[]>(API_ENDPOINTS.PRODUCT, {
        params: { q: keyword },
      })
      .then((res) => res.data)
  },

  async find(id: number): Promise<ProductReadT> {
    return axiosInstance
      .get<ProductReadT>(`${API_ENDPOINTS.PRODUCT}/${id}`)
      .then((res) => res.data)
  },

  async create(data: CreateProductInput): Promise<string> {
    return axiosInstance
      .post<string>(API_ENDPOINTS.PRODUCT, data)
      .then((res) => res.data)
  },

  async update(id: number, data: UpdateProductInput): Promise<string> {
    return axiosInstance
      .put<string>(`${API_ENDPOINTS.PRODUCT}/${id}`, data)
      .then((res) => res.data)
  },

  async delete(id: number): Promise<void> {
    return axiosInstance
      .delete(`${API_ENDPOINTS.PRODUCT}/${id}`)
      .then(() => undefined)
  },
} as const)
