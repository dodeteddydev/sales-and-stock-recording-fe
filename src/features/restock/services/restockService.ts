import { api } from "@/api/client";
import type { Params } from "@/types/request";
import type { ApiResponse, ListResponse } from "@/types/response";
import type { RestockRequest, RestockResponse } from "../types/restock";

export const getRestock = async (params: Params) => {
  const response = await api.get<ApiResponse<ListResponse<RestockResponse[]>>>(
    "/restock",
    { params },
  );

  return response.data;
};

export const postRestock = async (request: RestockRequest) => {
  const response = await api.post<ApiResponse<RestockResponse>>(
    "/restock",
    request,
  );

  return response.data;
};

export const putRestock = async (request: { id: number } & RestockRequest) => {
  const response = await api.put<ApiResponse<RestockResponse>>(
    `/restock/${request.id}`,
    request,
  );

  return response.data;
};
