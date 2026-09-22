import { api } from "@/api/client";
import type { ApiResponse } from "@/types/response";
import type { DashboardParams, DashboardResponse } from "../types/dashboard";

export const getDashboard = async (params: DashboardParams) => {
  const response = await api.get<ApiResponse<DashboardResponse>>("/dashboard", {
    params,
  });

  return response.data;
};
