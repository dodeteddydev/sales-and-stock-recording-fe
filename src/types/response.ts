export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: string | string[];
};

export type MetaResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};
