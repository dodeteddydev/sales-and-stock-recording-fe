import type { IdNameResponse } from "@/types/response";

export type CustomerResponse = {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
  createdBy: IdNameResponse;
};
