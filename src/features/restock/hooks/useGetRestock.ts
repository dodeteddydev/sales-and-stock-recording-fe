import { useGetData } from "@/hooks/useGetData";
import type { Params } from "@/types/request";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getRestock } from "../services/restockService";
import type { RestockResponse } from "../types/restock";

export const useGetRestock = (filters: Params) => {
  return useGetData<Params, ApiResponse<ListResponse<RestockResponse[]>>>(
    filters,
    getRestock,
  );
};
