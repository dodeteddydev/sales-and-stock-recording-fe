import { api } from "@/api/client";
import type { ApiResponse } from "@/types/response";
import type { LoginRequest, LoginResponse } from "../types/login";

export const login = async (payload: LoginRequest) => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload,
  );

  return response;
};
