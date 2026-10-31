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
import type {
  SalesFormValues,
  SalesRequest,
  SalesResponse,
} from "../types/sales";

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

  const [id, setId] = useState<number>();

  const createInitialFormValues = (): SalesFormValues => ({
    customerId: 0,
    customerName: "",
    items: [
      {
        key: crypto.randomUUID(),
        productId: 0,
        productName: "",
        qty: 1,
      },
    ],
  });
  const [formValues, setFormValues] =
    useState<SalesFormValues>(createInitialFormValues);

  const handleChange = <K extends keyof SalesFormValues>(
    name: K,
    value: SalesFormValues[K],
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickAdd = () => {
    setFormValues(createInitialFormValues());
    setIsOpen(true);
    setId(undefined);
  };

  const handleClickEdit = (data: SalesResponse) => {
    setId(data.id);
    setFormValues({
      customerId: data.customer.id,
      customerName: data.customer.name,
      items: data.items.map((item) => ({
        key: crypto.randomUUID(),
        productId: item.product.id,
        productName: item.product.name,
        qty: item.qty,
      })),
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setId(undefined);
    setFormValues(createInitialFormValues());
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
    { id: number; request: SalesRequest },
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
    if (
      !formValues.customerId ||
      formValues.items.length === 0 ||
      formValues.items.some(
        (item) =>
          !item.productId || !Number.isFinite(item.qty) || item.qty < 1,
      )
    ) {
      toast.error(
        "Select a customer and a product with a quantity of at least 1 for every item.",
      );
      return;
    }

    const request: SalesRequest = {
      customerId: formValues.customerId,
      items: formValues.items.map(({ productId, qty }) => ({ productId, qty })),
    };

    if (id !== undefined)
      return await editSales.mutate({
        id,
        request,
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
        title={`${id ? "Edit" : "Add"} Sales`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={formValues} onChange={handleChange}>
            <SalesForm />
          </FormProvider>

          <Button disabled={addSales.isLoading || editSales.isLoading}>
            {addSales.isLoading || editSales.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </main>
  );
};
