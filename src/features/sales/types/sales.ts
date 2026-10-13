import type { IdNameResponse } from "@/types/response";

export type SalesRequest = {
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  qty: number;
};

export type SalesResponse = {
  id: number;
  qty: number;
  price: number;
  total: number;
  customer: IdNameResponse;
  product: IdNameResponse;
  createdAt: string;
  updatedAt: string;
  createdBy: IdNameResponse;
  updatedBy: IdNameResponse | null;
};
