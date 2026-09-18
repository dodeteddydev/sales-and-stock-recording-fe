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
import { ProductFilters } from "../components/ProductFilters";
import { ProductForm } from "../components/ProductForm";
import { ProductTable } from "../components/ProductTable";
import { useGetProduct } from "../hooks/useGetProduct";
import { postProduct, putProduct } from "../services/productService";
import type { ProductRequest, ProductResponse } from "../types/product";

import styles from "./ProductPage.module.css";

export const ProductPage = () => {
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

  const { isLoading, data } = useGetProduct(filters);

  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState<number>();

  const initialRequest: ProductRequest = {
    name: "",
    basePrice: 0,
    sellPrice: 0,
    stock: 0,
  };
  const [request, setRequest] = useState<ProductRequest>(initialRequest);

  const handleChange = <K extends keyof ProductRequest>(
    name: K,
    value: ProductRequest[K],
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

  const handleClickEdit = (data: ProductResponse) => {
    setId(data.id);
    setRequest({
      name: data.name,
      basePrice: data.basePrice,
      sellPrice: data.sellPrice,
      stock: data.stock,
    });
    setIsOpen(true);
  };

  const handleResetState = () => {
    setFilters(initialFilter);
    setId(undefined);
    setRequest(initialRequest);
    setIsOpen(false);
  };

  const addProduct = useMutation<ProductRequest, ApiResponse<ProductResponse>>(
    postProduct,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );
  const editProduct = useMutation<
    { id: number } & ProductRequest,
    ApiResponse<ProductResponse>
  >(
    putProduct,
    (response) => {
      handleResetState();
      toast.success(response.message);
    },
    (error) => toast.error(getErrorMessage(error)),
  );

  const handleSubmit = async () => {
    if (id)
      return await editProduct.mutate({
        ...request,
        id,
      });

    await addProduct.mutate(request);
  };

  return (
    <>
      <main>
        <div className={styles.addButtonWrapper}>
          <div className={styles.addButton}>
            <Button onClick={handleClickAdd}>Add Product</Button>
          </div>
        </div>

        <ProductFilters search={search} onSearch={setSearch} />

        <ProductTable
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
        title={`${id ? "Edit" : "Add"} Product`}
      >
        <Form onSubmit={handleSubmit}>
          <FormProvider values={request} onChange={handleChange}>
            <ProductForm />
          </FormProvider>

          <Button disabled={addProduct.isLoading}>
            {addProduct.isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};
