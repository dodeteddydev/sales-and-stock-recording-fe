import { api } from "@/api/client";
import type { ApiResponse, ListResponse } from "@/types/response";
import type {
  CashFlowParams,
  CashFlowRequest,
  CashFlowResponse,
} from "../types/cashflow";

export const getCashFlow = async (params: CashFlowParams) => {
  const response = await api.get<ApiResponse<ListResponse<CashFlowResponse[]>>>(
    "/cash-flow",
    { params },
  );

  return response.data;
};

export const postCashFlow = async (request: CashFlowRequest) => {
  const response = await api.post<ApiResponse<CashFlowResponse>>(
    "/cash-flow",
    request,
  );

  return response.data;
};

export const putCashFlow = async (
  request: { id: number } & CashFlowRequest,
) => {
  const response = await api.put<ApiResponse<CashFlowResponse>>(
    `/cash-flow/${request.id}`,
    request,
  );

  return response.data;
};
