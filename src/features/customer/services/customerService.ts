import { api } from "@/api/client";
import type { Params } from "@/types/request";
import type { ApiResponse, ListResponse } from "@/types/response";
import type { CustomerRequest, CustomerResponse } from "../types/customer";

export const getCustomer = async (params: Params) => {
  const response = await api.get<ApiResponse<ListResponse<CustomerResponse[]>>>(
    "/customer",
    { params },
  );

  return response.data;
};

export const postCustomer = async (request: CustomerRequest) => {
  const response = await api.post<ApiResponse<CustomerResponse>>(
    "/customer",
    request,
  );

  return response.data;
};

export const putCustomer = async ({
  id,
  request,
}: {
  id: number;
  request: CustomerRequest;
}) => {
  const response = await api.put<ApiResponse<CustomerResponse>>(
    `/customer/${id}`,
    request,
  );

  return response.data;
};
