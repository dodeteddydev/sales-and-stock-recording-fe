import { useGetData } from "@/hooks/useGetData";
import type { Params } from "@/types/request";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getCustomer } from "../services/customerService";
import type { CustomerResponse } from "../types/customer";

export const useGetCustomer = (filters: Params) => {
  return useGetData<Params, ApiResponse<ListResponse<CustomerResponse[]>>>(
    filters,
    getCustomer,
  );
};
