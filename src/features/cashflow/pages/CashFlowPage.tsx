import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { Modal } from "@/components/Modal/Modal";
import { Pagination } from "@/components/Pagination/Pagination";
import { FormProvider } from "@/context/FormProvider";
import { useMutation } from "@/hooks/useMutation";
import type { ApiResponse } from "@/types/response";
import { getErrorMessage } from "@/utilities/error";
import { CashFlowFilters } from "../components/CashFlowFilters";
import { CashFlowForm } from "../components/CashFlowForm";
import { CashFlowTable } from "../components/CashFlowTable";
import { useGetCashFlow } from "../hooks/useGetCashFlow";
import { postCashFlow, putCashFlow } from "../services/cashflowService";
import type {
  CashFlowParams,
  CashFlowRequest,
  CashFlowResponse,
} from "../types/cashflow";

import styles from "./CashFlowPage.module.css";

export const CashFlowPage = () => {
  const initialFilter: CashFlowParams = {
    type: undefined,
    category: undefined,
    page: 1,
    limit: 10,
  };
  const [filters, setFilters] = useState<CashFlowParams>(initialFilter);

  const handleChangeFilter = <K extends keyof CashFlowParams>(
    name: K,
    value: CashFlowParams[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "limit" || name === "type" || name === "category"
        ? { page: 1 }
        : {}),
    }));
  };

  const { isLoading, data } = useGetCashFlow(filters);

  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState<number>();

  const initialRequest: CashFlowRequest = {
    type: "IN",
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

  const handleClickAdd = () => {
    setRequest(initialRequest);
    setIsOpen(true);
  };

  const handleClickEdit = (data: CashFlowResponse) => {
    setId(data.id);
    setRequest({
      type: data.type,
      category: data.category,
      amount: data.amount,
      note: data.note,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setId(undefined);
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
  const editCashFlow = useMutation<
    { id: number } & CashFlowRequest,
    ApiResponse<CashFlowResponse>
  >(
    putCashFlow,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => {
    if (id)
      return await editCashFlow.mutate({
        ...request,
        id,
      });

    await addCashFlow.mutate(request);
  };

  return (
    <main>
      <div className={styles.addButtonWrapper}>
        <div className={styles.addButton}>
          <Button onClick={handleClickAdd}>Add CashFlow</Button>
        </div>
      </div>

      <CashFlowFilters filter={filters} onChangeFilter={handleChangeFilter} />

      <CashFlowTable
        isLoading={isLoading}
        data={data?.data?.data}
        onClickEdit={handleClickEdit}
      />

      {data?.data.meta && data.data.meta.total > 10 && (
        <Pagination
          meta={data.data.meta}
          onChangeLimit={(limit) => handleChangeFilter("limit", limit)}
          onChangePage={(page) => handleChangeFilter("page", page)}
        />
      )}

      <Modal
        position="top"
        size="xl"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${id ? "Edit" : "Add"} CashFlow`}
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
