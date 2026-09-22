import { useEffect, useState } from "react";

import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import { useGetProduct } from "@/features/product/hooks/useGetProduct";
import { useDebounce } from "@/hooks/useDebounce";
import type { Params } from "@/types/request";
import type { RestockRequest, RestockResponse } from "../types/restock";

import styles from "./RestockForm.module.css";

type RestockFormProps = {
  data: RestockResponse;
};

export const RestockForm = ({ data }: RestockFormProps) => {
  const { values, onChange } = useFormContext<RestockRequest>();

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
      // eslint-disable-next-line
      setFiltersProduct((prev) => ({ ...prev, search: data?.product.name }));
    }
  }, [data?.product]);

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
