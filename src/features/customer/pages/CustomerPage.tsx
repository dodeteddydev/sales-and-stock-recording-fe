import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { Modal } from "@/components/Modal/Modal";
import { Pagination } from "@/components/Pagination/Pagination";
import { FormProvider } from "@/context/FormProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@/hooks/useMutation";
import type { Params } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import { getErrorMessage } from "@/utilities/error";
import { CustomerFilters } from "../components/CustomerFilters";
import { CustomerForm } from "../components/CustomerForm";
import { CustomerTable } from "../components/CustomerTable";
import { useGetCustomer } from "../hooks/useGetCustomer";
import { postCustomer, putCustomer } from "../services/customerService";
import type { CustomerRequest, CustomerResponse } from "../types/customer";

import styles from "./CustomerPage.module.css";

export const CustomerPage = () => {
  const [search, setSearch] = useState("");
  const initialFilter: Params = {
    search: "",
    page: 1,
    limit: 10,
  };
  const [filters, setFilters] = useState<Params>(initialFilter);

  const debouncedSearch = useDebounce(search, 500);

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

  useEffect(() => {
    handleChangeFilter("search", debouncedSearch); // eslint-disable-line
  }, [debouncedSearch]);

  const { isLoading, data } = useGetCustomer(filters);

  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState<number>();

  const initialRequest: CustomerRequest = {
    name: "",
    phone: "",
  };
  const [request, setRequest] = useState<CustomerRequest>(initialRequest);

  const handleChange = <K extends keyof CustomerRequest>(
    name: K,
    value: CustomerRequest[K],
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

  const handleClickEdit = (data: CustomerResponse) => {
    setId(data.id);
    setRequest({
      name: data.name,
      phone: data.phone,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setId(undefined);
    setRequest(initialRequest);
    setIsOpen(false);
  };

  const addCustomer = useMutation<
    CustomerRequest,
    ApiResponse<CustomerResponse>
  >(
    postCustomer,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );
  const editCustomer = useMutation<
    { id: number } & CustomerRequest,
    ApiResponse<CustomerResponse>
  >(
    putCustomer,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => {
    if (id)
      return await editCustomer.mutate({
        ...request,
        id,
      });

    await addCustomer.mutate(request);
  };

  return (
    <>
      <main>
        <div className={styles.addButtonWrapper}>
          <div className={styles.addButton}>
            <Button onClick={handleClickAdd}>Add Customer</Button>
          </div>
        </div>

        <CustomerFilters search={search} onSearch={setSearch} />

        <CustomerTable
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
      </main>

      <Modal
        position="top"
        size="xl"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${id ? "Edit" : "Add"} Customer`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={request} onChange={handleChange}>
            <CustomerForm />
          </FormProvider>

          <Button disabled={addCustomer.isLoading}>
            {addCustomer.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};
