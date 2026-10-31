import type { IdNameResponse } from "@/types/response";

export type SalesItemRequest = {
  productId: number;
  qty: number;
};

export type SalesRequest = {
  customerId: number;
  items: SalesItemRequest[];
};

export type SalesFormItem = SalesItemRequest & {
  key: string;
  productName: string;
};

export type SalesFormValues = {
  customerId: number;
  customerName: string;
  items: SalesFormItem[];
};

export type SalesItemResponse = {
  qty: number;
  price: number;
  total: number;
  product: IdNameResponse;
};

export type SalesResponse = {
  id: number;
  total?: number;
  customer: IdNameResponse;
  items: SalesItemResponse[];
  createdAt: string;
  updatedAt: string;
  createdBy: IdNameResponse;
  updatedBy: IdNameResponse | null;
};
