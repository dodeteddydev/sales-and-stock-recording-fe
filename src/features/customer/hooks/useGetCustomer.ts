import { useState } from "react";

import { useGetData } from "@/hooks/useGetData";
import type { Params } from "@/types/request";
import { type ApiResponse, type ListResponse } from "@/types/response";
import { getCustomer } from "../services/customerService";
import type { CustomerResponse } from "../types/customer";

export const useGetCustomer = () => {
  const [filters, setFilters] = useState<Params>({
    search: "",
    page: 1,
    limit: 10,
  });

  const handleChangeFilter = <K extends keyof Params>(
    name: K,
    value: Params[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    ...useGetData<Params, ApiResponse<ListResponse<CustomerResponse[]>>>(
      filters,
      getCustomer,
    ),
    filters,
    handleChangeFilter,
  };
};
