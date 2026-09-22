import { api } from "@/api/client";
import type { Params } from "@/types/request";
import type { ApiResponse, ListResponse } from "@/types/response";
import type { SalesRequest, SalesResponse } from "../types/sales";

export const getSales = async (params: Params) => {
  const response = await api.get<ApiResponse<ListResponse<SalesResponse[]>>>(
    "/sale",
    { params },
  );

  return response.data;
};

export const postSales = async (request: SalesRequest) => {
  const response = await api.post<ApiResponse<SalesResponse>>("/sale", request);

  return response.data;
};

export const putSales = async (request: { id: number } & SalesRequest) => {
  const response = await api.put<ApiResponse<SalesResponse>>(
    `/sale/${request.id}`,
    request,
  );

  return response.data;
};
