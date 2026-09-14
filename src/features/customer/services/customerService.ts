import { api } from "@/api/client";
import type { Params } from "@/types/request";
import type { ApiResponse, ListResponse } from "@/types/response";
import type { CustomerResponse } from "../types/customer";

export const getCustomer = async (params: Params) => {
  const response = await api.get<ApiResponse<ListResponse<CustomerResponse[]>>>(
    "/customer",
    { params },
  );

  return response.data;
};
