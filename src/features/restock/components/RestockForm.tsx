import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import { SelectProduct } from "@/features/product/components/SelectProduct";
import type { RestockRequest } from "../types/restock";

type RestockFormProps = {
  isEdit?: boolean;
};

export const RestockForm = ({ isEdit }: RestockFormProps) => {
  const { values, onChange } = useFormContext<RestockRequest>();

  return (
    <>
      <SelectProduct
        value={
          values.productId && values.productName
            ? { label: values.productName, value: String(values.productId) }
            : null
        }
        onChange={(option) => {
          onChange("productId", option ? Number(option.value) : 0);
          onChange("productName", option ? option.label : "");
        }}
        isDisabled={isEdit}
      />

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
