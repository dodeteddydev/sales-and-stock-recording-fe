import type { Params } from "@/types/request";
import type { IdNameResponse } from "@/types/response";

export type CashFlowType = "IN" | "OUT";

export type CashFlowCategory = "RETURN" | "RESTOCK" | "LOAN" | "RETURN";

export type CashFlowParams = Omit<Params, "search"> & {
  type?: CashFlowType;
  category?: CashFlowCategory;
};

export type CashFlowRequest = {
  type: CashFlowType;
  category: CashFlowCategory;
  amount: number;
  note: string;
};

export type CashFlowResponse = {
  id: number;
  type: CashFlowType;
  category: CashFlowCategory;
  amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  createdBy: IdNameResponse;
  updatedBy: IdNameResponse | null;
};
