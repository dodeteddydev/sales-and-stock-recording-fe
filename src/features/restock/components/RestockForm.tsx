import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { useFormContext } from "@/context/useFormContext";
import { getProduct } from "@/features/product/services/productService";
import type { ProductResponse } from "@/features/product/types/product";
import { getErrorMessage } from "@/utilities/error";
import type { RestockRequest } from "../types/restock";

type RestockFormProps = {
  isEdit: boolean;
};

export const RestockForm = ({ isEdit }: RestockFormProps) => {
  const { values, onChange } = useFormContext<RestockRequest>();

  const [isLoading, setIsloading] = useState(false);
  const [dataProduct, setDataProduct] = useState<ProductResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setIsloading(true);

        const res = await getProduct();

        if (isMounted) {
          setDataProduct(res.data.data ?? []);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsloading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const options = dataProduct.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  return (
    <>
      {!isEdit && (
        <Select
          id="productId"
          label="Product"
          options={options}
          value={String(values.productId)}
          onChange={(event) =>
            onChange("productId", Number(event.target.value))
          }
          disabled={isLoading}
          required
        />
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
