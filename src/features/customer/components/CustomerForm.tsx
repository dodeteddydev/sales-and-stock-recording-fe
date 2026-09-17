import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import type { CustomerRequest } from "../types/customer";

export const CustomerForm = () => {
  const { values, onChange } = useFormContext<CustomerRequest>();

  return (
    <>
      <Input
        id="name"
        label="Name"
        placeholder="e.g. johndoe"
        type="text"
        value={values.name}
        onChange={(e) => onChange("name", e.target.value)}
        required
      />

      <Input
        id="phone"
        label="Phone"
        placeholder="e.g. 123456"
        type="tel"
        value={values.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        required
      />
    </>
  );
};
