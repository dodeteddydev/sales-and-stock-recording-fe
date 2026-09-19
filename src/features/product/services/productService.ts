import { api } from "@/api/client";
import type { Params } from "@/types/request";
import type { ApiResponse, ListResponse } from "@/types/response";
import type { ProductRequest, ProductResponse } from "../types/product";

export const getProduct = async (params: Params) => {
  const response = await api.get<ApiResponse<ListResponse<ProductResponse[]>>>(
    "/product",
    { params },
  );

  return response.data;
};

export const postProduct = async (request: ProductRequest) => {
  const response = await api.post<ApiResponse<ProductResponse>>(
    "/product",
    request,
  );

  return response.data;
};

export const putProduct = async (request: { id: number } & ProductRequest) => {
  const response = await api.put<ApiResponse<ProductResponse>>(
    `/product/${request.id}`,
    request,
  );

  return response.data;
};
