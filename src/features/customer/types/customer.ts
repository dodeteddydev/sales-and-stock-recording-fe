import type { IdNameResponse } from "@/types/response";

export type CustomerRequest = {
  name: string;
  phone: string;
};

export type CustomerResponse = {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
  createdBy: IdNameResponse;
};
