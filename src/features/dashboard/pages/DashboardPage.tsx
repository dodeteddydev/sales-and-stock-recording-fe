import {
  ArrowDownToLine,
  ArrowUpFromLine,
  HandCoins,
  RotateCcw,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { Modal } from "@/components/Modal/Modal";
import { FormProvider } from "@/context/FormProvider";
import { postCashFlow } from "@/features/cashflow/services/cashflowService";
import type {
  CashFlowCategory,
  CashFlowRequest,
  CashFlowResponse,
} from "@/features/cashflow/types/cashflow";
import { useMutation } from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/response";
import { getErrorMessage } from "@/utilities/error";
import { CashFlowForm } from "../../cashflow/components/CashFlowForm";
import { DashboardFilters } from "../components/DashboardFilters";
import { DashboardItem } from "../components/DashboardItem";
import { useGetDashboard } from "../hooks/useGetDashboard";
import type { DashboardParams } from "../types/dashboard";

import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const today = new Date();

  const initialFilter: DashboardParams = {
    startDate: formatDate(
      new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
    ),
    endDate: formatDate(today),
  };

  const [filters, setFilters] = useState<DashboardParams>(initialFilter);

  const handleChangeFilter = <K extends keyof DashboardParams>(
    name: K,
    value: DashboardParams[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isLoading, data } = useGetDashboard(filters);

  const icons = {
    totalCashIn: ArrowDownToLine,
    totalCashOut: ArrowUpFromLine,
    totalSales: ShoppingCart,
    totalRestocks: Truck,
    totalLoans: HandCoins,
    totalReturns: RotateCcw,
  };

  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState<CashFlowCategory>();

  const initialRequest: CashFlowRequest = {
    type: "OUT",
    category: "LOAN",
    amount: 0,
    note: "",
  };
  const [request, setRequest] = useState<CashFlowRequest>(initialRequest);

  const handleChange = <K extends keyof CashFlowRequest>(
    name: K,
    value: CashFlowRequest[K],
  ) => {
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickItem = (category: CashFlowCategory) => {
    setCategory(category);
    setRequest({
      ...initialRequest,
      type: category === "LOAN" ? "OUT" : "IN",
      category,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setCategory(undefined);
    setRequest(initialRequest);
    setIsOpen(false);
  };

  const addCashFlow = useMutation<
    CashFlowRequest,
    ApiResponse<CashFlowResponse>
  >(
    postCashFlow,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => await addCashFlow.mutate(request);

  return (
    <main>
      <DashboardFilters filter={filters} onChangeFilter={handleChangeFilter} />

      <div className={styles.wrapperFund}>
        <DashboardItem
          title="Total Funds"
          value={(data?.data.totalCashIn ?? 0) - (data?.data.totalCashOut ?? 0)}
          icon={Wallet}
          isLoading={isLoading}
        />
      </div>

      <div className={styles.wrapperItems}>
        {Object.entries(data?.data ? data.data : {}).map(([key, value]) => {
          const Icon = icons[key as keyof typeof icons];
          const isClickable = key === "totalLoans" || key === "totalReturns";

          return (
            <DashboardItem
              key={key}
              title={key}
              value={value}
              icon={Icon}
              isLoading={isLoading}
              isClickable={isClickable}
              onClick={() =>
                handleClickItem(key === "totalLoans" ? "LOAN" : "RETURN")
              }
            />
          );
        })}
      </div>

      <Modal
        position="top"
        size="xl"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${category === "LOAN" ? "Loan" : "Return"} Cash`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={request} onChange={handleChange}>
            <CashFlowForm />
          </FormProvider>

          <Button disabled={addCashFlow.isLoading}>
            {addCashFlow.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </main>
  );
};
