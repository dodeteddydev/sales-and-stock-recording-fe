import { useGetData } from "@/hooks/useGetData";
import { type ApiResponse } from "@/types/response";
import { getDashboard } from "../services/dashboardService";
import type { DashboardParams, DashboardResponse } from "../types/dashboard";

export const useGetDashboard = (filters: DashboardParams) => {
  return useGetData<DashboardParams, ApiResponse<DashboardResponse>>(
    filters,
    getDashboard,
  );
};
