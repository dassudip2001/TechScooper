import { axiosInstance } from "./axios";
import { API_ENDPOINTS } from "./data";
import type { ProductReadT } from "./schema/product.schema";

export interface RecommentServiceT {
  get: ( productId:number) => Promise<ProductReadT[]>;
}

export const recomemntService: Readonly<RecommentServiceT> = Object.freeze({
  async get(productId: number): Promise<ProductReadT[]> {
    return axiosInstance
      .get<ProductReadT[]>(`${API_ENDPOINTS.RECOMMENDS}/${productId}`)
      .then((res) => res.data);
  },

} as const);
