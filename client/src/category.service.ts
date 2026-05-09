import { axiosInstance } from "./axios";
import { API_ENDPOINTS } from "./data";
import type { CategoryReadT } from "./schema/category.schema";

export interface CategoryServiceT {
  get: () => Promise<CategoryReadT[]>;
  find: (id: number) => Promise<CategoryReadT>;
}

export const CategoryService: Readonly<CategoryServiceT> = Object.freeze({
  async get(): Promise<CategoryReadT[]> {
    return axiosInstance
      .get<CategoryReadT[]>(API_ENDPOINTS.CATEGORY)
      .then((res) => res.data);
  },

  async find(id: number): Promise<CategoryReadT> {
    return axiosInstance
      .get<CategoryReadT>(`${API_ENDPOINTS.CATEGORY}/${id}`)
      .then((res) => res.data);
  },
} as const);
