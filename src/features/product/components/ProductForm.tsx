import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import type { ProductRequest } from "../types/product";

export const ProductForm = () => {
  const { values, onChange } = useFormContext<ProductRequest>();

  return (
    <>
      <Input
        id="name"
        label="Name"
        placeholder="e.g. Minyak kutus-kutus"
        type="text"
        value={values.name}
        onChange={(e) => onChange("name", e.target.value)}
        required
      />

      <Input
        id="basePrice"
        label="Base Price"
        placeholder="e.g. 200000"
        type="number"
        value={values.basePrice}
        onChange={(e) => onChange("basePrice", e.target.valueAsNumber)}
        required
      />

      <Input
        id="sellPrice"
        label="Sell Price"
        placeholder="e.g. 200000"
        type="number"
        value={values.sellPrice}
        onChange={(e) => onChange("sellPrice", e.target.valueAsNumber)}
        required
      />

      <Input
        id="stock"
        label="Stock"
        placeholder="e.g. 50"
        type="number"
        value={values.stock}
        onChange={(e) => onChange("stock", e.target.valueAsNumber)}
        required
      />
    </>
  );
};
