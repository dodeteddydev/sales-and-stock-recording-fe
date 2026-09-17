export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: string | string[];
};

export type ListResponse<T> = {
  data: T;
  meta: Meta;
};
export type Meta = {
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

export type IdNameResponse = {
  id: number;
  name: number;
};
