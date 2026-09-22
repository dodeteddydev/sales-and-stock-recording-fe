import { useGetData } from "@/hooks/useGetData";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getCashFlow } from "../services/cashflowService";
import type { CashFlowParams, CashFlowResponse } from "../types/cashflow";

export const useGetCashFlow = (filters: CashFlowParams) => {
  return useGetData<
    CashFlowParams,
    ApiResponse<ListResponse<CashFlowResponse[]>>
  >(filters, getCashFlow);
};
