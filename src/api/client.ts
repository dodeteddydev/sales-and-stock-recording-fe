import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { STORAGE_KEYS } from "@/constans/storageKey";
import type { ApiResponse, RefreshTokenResponse } from "@/types/response";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

const setAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  } else {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
    const response = await api.post<ApiResponse<RefreshTokenResponse>>(
      "/auth/refresh-token",
      { refreshToken },
    );

    return response.data.data.token;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh-token")) {
      setAccessToken(null);

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }

      const newAccessToken = await refreshPromise;

      if (!newAccessToken) {
        setAccessToken(null);

        return Promise.reject(error);
      }

      setAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);
