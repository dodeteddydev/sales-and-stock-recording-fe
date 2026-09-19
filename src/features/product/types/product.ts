import type { IdNameResponse } from "@/types/response";

export type ProductRequest = {
  name: string;
  basePrice: number;
  sellPrice: number;
  stock: number;
};

export type ProductResponse = {
  id: number;
  name: string;
  basePrice: number;
  sellPrice: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  createdBy: IdNameResponse;
  updatedBy: IdNameResponse | null;
};
