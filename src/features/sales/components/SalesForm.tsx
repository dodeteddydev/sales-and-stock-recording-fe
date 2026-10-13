import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import { SelectCustomer } from "@/features/customer/components/SelectCustomer";
import { SelectProduct } from "@/features/product/components/SelectProduct";
import type { SalesRequest } from "../types/sales";

export const SalesForm = () => {
  const { values, onChange } = useFormContext<SalesRequest>();

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
      />

      <SelectCustomer
        value={
          values.customerId && values.customerName
            ? { label: values.customerName, value: String(values.customerId) }
            : null
        }
        onChange={(option) => {
          onChange("customerId", option ? Number(option.value) : 0);
          onChange("customerName", option ? option.label : "");
        }}
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
