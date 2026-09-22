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
import { RestockForm } from "../components/RestockForm";
import { RestockTable } from "../components/RestockTable";
import { useGetRestock } from "../hooks/useGetRestock";
import { postRestock, putRestock } from "../services/restockService";
import type { RestockRequest, RestockResponse } from "../types/restock";

import styles from "./RestockPage.module.css";

export const RestockPage = () => {
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

  const { isLoading, data } = useGetRestock(filters);

  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState<number>();

  const initialRequest: RestockRequest = {
    productId: 0,
    qty: 0,
  };
  const [request, setRequest] = useState<RestockRequest>(initialRequest);

  const handleChange = <K extends keyof RestockRequest>(
    name: K,
    value: RestockRequest[K],
  ) => {
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickAdd = () => {
    setRequest(initialRequest);
    setIsOpen(true);
    setId(undefined);
  };

  const handleClickEdit = (data: RestockResponse) => {
    setId(data.id);
    setRequest({
      productId: data.product.id,
      qty: data.qty,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setId(undefined);
    setRequest(initialRequest);
    setIsOpen(false);
  };

  const addRestock = useMutation<RestockRequest, ApiResponse<RestockResponse>>(
    postRestock,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );
  const editRestock = useMutation<
    { id: number } & RestockRequest,
    ApiResponse<RestockResponse>
  >(
    putRestock,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => {
    if (id)
      return await editRestock.mutate({
        ...request,
        id,
      });

    await addRestock.mutate(request);
  };

  return (
    <main>
      <div className={styles.addButtonWrapper}>
        <div className={styles.addButton}>
          <Button onClick={handleClickAdd}>Add Restock</Button>
        </div>
      </div>

      <RestockTable
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
        title={`${id ? "Edit" : "Add"} Restock`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={request} onChange={handleChange}>
            <RestockForm isEdit={!!id} />
          </FormProvider>

          <Button disabled={addRestock.isLoading}>
            {addRestock.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </main>
  );
};
