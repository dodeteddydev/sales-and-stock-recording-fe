/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import { useGetCustomer } from "@/features/customer/hooks/useGetCustomer";
import { useGetProduct } from "@/features/product/hooks/useGetProduct";
import { useDebounce } from "@/hooks/useDebounce";
import type { Params } from "@/types/request";
import type { SalesRequest, SalesResponse } from "../types/sales";

import styles from "./SalesForm.module.css";

type SalesFormProps = {
  data?: SalesResponse;
};

export const SalesForm = ({ data }: SalesFormProps) => {
  const { values, onChange } = useFormContext<SalesRequest>();

  const [filtersProduct, setFiltersProduct] = useState<Params>({
    search: "",
    page: 1,
    limit: 10,
  });
  const debounceFilterProduct = useDebounce(filtersProduct, 500);
  const { isLoading: isLoadingProduct, data: dataProduct } = useGetProduct(
    debounceFilterProduct,
  );

  useEffect(() => {
    if (data?.product && data.product.name) {
      setFiltersProduct((prev) => ({ ...prev, search: data?.product.name }));
    }
  }, [data?.product]);

  const [filtersCustomer, setFiltersCustomer] = useState<Params>({
    search: "",
    page: 1,
    limit: 10,
  });
  const debouncedFilterCustomer = useDebounce(filtersCustomer, 500);
  const { isLoading: isLoadingCustomer, data: dataCustomer } = useGetCustomer(
    debouncedFilterCustomer,
  );

  useEffect(() => {
    if (data?.customer && data.customer.name) {
      setFiltersCustomer((prev) => ({ ...prev, search: data?.customer.name }));
    }
  }, [data?.customer]);

  return (
    <>
      <Input
        id="searchProduct"
        label="Search Product"
        placeholder="e.g. Minyak kutus-kutus"
        value={filtersProduct.search}
        onChange={(e) => {
          setFiltersProduct((prev) => ({ ...prev, search: e.target.value }));
          onChange("productId", 0);
        }}
      />

      {!values.productId && (
        <div className={styles.itemWrapper}>
          {isLoadingProduct ? (
            <p className={styles.loadingText}>Loading...</p>
          ) : dataProduct?.data.data && dataProduct.data.data.length > 0 ? (
            dataProduct.data.data.map((item, index) => (
              <div
                key={`${item.id}-${index}-product`}
                className={styles.item}
                onClick={() => {
                  if (item.id !== values.productId) {
                    setFiltersProduct((prev) => ({
                      ...prev,
                      search: item.name,
                    }));
                    onChange("productId", item.id);
                  }
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <p className={styles.loadingText}>Not Found</p>
          )}
        </div>
      )}

      <Input
        id="searchCustomer"
        label="Search Customer"
        placeholder="e.g. John Doe"
        value={filtersCustomer.search}
        onChange={(e) => {
          setFiltersCustomer((prev) => ({ ...prev, search: e.target.value }));
          onChange("customerId", 0);
        }}
      />

      {!values.customerId && (
        <div className={styles.itemWrapper}>
          {isLoadingCustomer ? (
            <p className={styles.loadingText}>Loading...</p>
          ) : dataCustomer?.data.data && dataCustomer.data.data.length > 0 ? (
            dataCustomer.data.data.map((item, index) => (
              <div
                key={`${item.id}-${index}-customer`}
                className={styles.item}
                onClick={() => {
                  if (item.id !== values.customerId) {
                    setFiltersCustomer((prev) => ({
                      ...prev,
                      search: item.name,
                    }));
                    onChange("customerId", item.id);
                  }
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <p className={styles.loadingText}>Not Found</p>
          )}
        </div>
      )}

      <Input
        id="qty"
        label="Qty"
        placeholder="e.g. 12"
        type="number"
        value={values.qty}
        onChange={(e) => onChange("qty", e.target.valueAsNumber)}
        required
      />
    </>
  );
};
