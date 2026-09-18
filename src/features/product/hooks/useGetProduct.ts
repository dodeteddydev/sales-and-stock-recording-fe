import { useGetData } from "@/hooks/useGetData";
import type { Params } from "@/types/request";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getProduct } from "../services/productService";
import type { ProductResponse } from "../types/product";

export const useGetProduct = (filters: Params) => {
  return useGetData<Params, ApiResponse<ListResponse<ProductResponse[]>>>(
    filters,
    getProduct,
  );
};
