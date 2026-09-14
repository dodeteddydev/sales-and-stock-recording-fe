import { useMutation } from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/response";
import { login } from "../services/loginService";
import type { LoginRequest, LoginResponse } from "../types/login";

type UseLogin = {
  onSuccess?: (response: ApiResponse<LoginResponse>) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: UseLogin) => {
  return useMutation<LoginRequest, ApiResponse<LoginResponse>>(
    login,
    onSuccess,
    onError,
  );
};
