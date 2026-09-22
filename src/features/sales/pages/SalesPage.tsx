import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { Modal } from "@/components/Modal/Modal";
import { Pagination } from "@/components/Pagination/Pagination";
import { FormProvider } from "@/context/FormProvider";
import { useMutation } from "@/hooks/useMutation";
import type { Params } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import { getErrorMessage } from "@/utilities/error";
import { SalesForm } from "../components/SalesForm";
import { SalesTable } from "../components/SalesTable";
import { useGetSales } from "../hooks/useGetSales";
import { postSales, putSales } from "../services/salesService";
import type { SalesRequest, SalesResponse } from "../types/sales";

import styles from "./SalesPage.module.css";

export const SalesPage = () => {
  const initialFilter: Params = {
    search: "",
    page: 1,
    limit: 10,
  };
  const [filters, setFilters] = useState<Params>(initialFilter);

  const handleChangeFilter = <K extends keyof Params>(
    name: K,
    value: Params[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "limit" || name === "search" ? { page: 1 } : {}),
    }));
  };

  const { isLoading, data } = useGetSales(filters);

  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<SalesResponse>();

  const initialRequest: SalesRequest = {
    customerId: 0,
    productId: 0,
    qty: 0,
  };
  const [request, setRequest] = useState<SalesRequest>(initialRequest);

  const handleChange = <K extends keyof SalesRequest>(
    name: K,
    value: SalesRequest[K],
  ) => {
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickAdd = () => {
    setRequest(initialRequest);
    setIsOpen(true);
    setSelected(undefined);
  };

  const handleClickEdit = (data: SalesResponse) => {
    setSelected(data);
    setRequest({
      customerId: data.customer.id,
      productId: data.product.id,
      qty: data.qty,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setSelected(undefined);
    setRequest(initialRequest);
    setIsOpen(false);
  };

  const addSales = useMutation<SalesRequest, ApiResponse<SalesResponse>>(
    postSales,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );
  const editSales = useMutation<
    { id: number } & SalesRequest,
    ApiResponse<SalesResponse>
  >(
    putSales,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => {
    if (selected)
      return await editSales.mutate({
        ...request,
        id: selected.id,
      });

    await addSales.mutate(request);
  };

  return (
    <main>
      <div className={styles.addButtonWrapper}>
        <div className={styles.addButton}>
          <Button onClick={handleClickAdd}>Add Sales</Button>
        </div>
      </div>

      <SalesTable
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
        title={`${selected && selected.id ? "Edit" : "Add"} Sales`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={request} onChange={handleChange}>
            <SalesForm data={selected} />
          </FormProvider>

          <Button disabled={addSales.isLoading}>
            {addSales.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </main>
  );
};
