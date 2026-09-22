import { useGetData } from "@/hooks/useGetData";
import type { Params } from "@/types/request";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getSales } from "../services/salesService";
import type { SalesResponse } from "../types/sales";

export const useGetSales = (filters: Params) => {
  return useGetData<Params, ApiResponse<ListResponse<SalesResponse[]>>>(
    filters,
    getSales,
  );
};
