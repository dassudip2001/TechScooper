import { axiosInstance } from "@/lib/axios"
import type { CategoryReadT, CategoryWriteT } from "@/schema/category.schema"
import { API_ENDPOINTS } from "./data"

export interface CategoryServiceT {
  get: () => Promise<CategoryReadT[]>
  find: (id: number) => Promise<CategoryReadT>
  create: (data: CategoryWriteT) => Promise<string>
  update: (id: number, data: CategoryWriteT) => Promise<string>
  delete: (id: number) => Promise<void>
}

export const CategoryService: Readonly<CategoryServiceT> = Object.freeze({
  async get(): Promise<CategoryReadT[]> {
    return axiosInstance
      .get<CategoryReadT[]>(API_ENDPOINTS.CATEGORY)
      .then((res) => res.data) 
  },

  async find(id: number): Promise<CategoryReadT> {
    return axiosInstance
      .get<CategoryReadT>(`${API_ENDPOINTS.CATEGORY}/${id}`)
      .then((res) => res.data)
  },

  async create(data: CategoryWriteT): Promise<string> {
    return axiosInstance
      .post<string>(API_ENDPOINTS.CATEGORY, data)
      .then((res) => res.data)
  },

  async update(id: number, data: CategoryWriteT): Promise<string> {
    return axiosInstance
      .put<string>(`${API_ENDPOINTS.CATEGORY}/${id}`, data)
      .then((res) => res.data)
  },

  async delete(id: number): Promise<void> {
    // Standardizing delete to void as the backend returns noContent()
    return axiosInstance
      .delete(`${API_ENDPOINTS.CATEGORY}/${id}`)
      .then(() => undefined)
  },
} as const)
