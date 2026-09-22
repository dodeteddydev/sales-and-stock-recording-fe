import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import type { CashFlowRequest } from "@/features/cashflow/types/cashflow";

export const CashFlowForm = () => {
  const { values, onChange } = useFormContext<CashFlowRequest>();

  return (
    <>
      <Input
        id="amount"
        label="Amount"
        placeholder="e.g. 200000"
        type="number"
        value={values.amount}
        onChange={(e) => onChange("amount", e.target.valueAsNumber)}
        required
      />

      <Input
        id="note"
        label="Note"
        placeholder="e.g. Loan, Return"
        type="text"
        value={values.note}
        onChange={(e) => onChange("note", e.target.value)}
        required
      />
    </>
  );
};
