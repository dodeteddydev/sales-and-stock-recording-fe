import type { IdNameResponse } from "@/types/response";

export type RestockRequest = {
  productId: number;
  qty: number;
};

export type RestockResponse = {
  id: number;
  qty: number;
  costPrice: number;
  product: IdNameResponse;
  createdAt: string;
  updatedAt: string;
  createdBy: IdNameResponse;
  updatedBy: IdNameResponse | null;
};
