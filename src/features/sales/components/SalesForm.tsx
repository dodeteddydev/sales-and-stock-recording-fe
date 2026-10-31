import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import { SelectCustomer } from "@/features/customer/components/SelectCustomer";
import { SelectProduct } from "@/features/product/components/SelectProduct";
import type { SalesFormValues } from "../types/sales";

import styles from "./SalesForm.module.css";

export const SalesForm = () => {
  const { values, onChange } = useFormContext<SalesFormValues>();

  return (
    <>
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

      <div className={styles.items}>
        {values.items.map((item, index) => (
          <div className={styles.item} key={item.key}>
            <div className={styles.removeButtonWraaper}>
              <button
                className={styles.removeButton}
                type="button"
                aria-label={`Remove product ${index + 1}`}
                disabled={values.items.length === 1}
                onClick={() =>
                  onChange(
                    "items",
                    values.items.filter(
                      (currentItem) => currentItem.key !== item.key,
                    ),
                  )
                }
              >
                <Trash2 size={18} />
              </button>
            </div>

            <SelectProduct
              id={`product-${item.key}`}
              value={
                item.productId && item.productName
                  ? {
                      label: item.productName,
                      value: String(item.productId),
                    }
                  : null
              }
              onChange={(option) => {
                onChange(
                  "items",
                  values.items.map((currentItem) =>
                    currentItem.key === item.key
                      ? {
                          ...currentItem,
                          productId: option ? Number(option.value) : 0,
                          productName: option ? option.label : "",
                        }
                      : currentItem,
                  ),
                );
              }}
            />

            <Input
              id={`qty-${item.key}`}
              label="Qty"
              placeholder="e.g. 12"
              type="number"
              min={1}
              value={Number.isFinite(item.qty) ? item.qty : ""}
              onChange={(e) => {
                const qty = e.target.valueAsNumber;
                onChange(
                  "items",
                  values.items.map((currentItem) =>
                    currentItem.key === item.key
                      ? { ...currentItem, qty }
                      : currentItem,
                  ),
                );
              }}
              required
            />
          </div>
        ))}
      </div>

      <div className={styles.addButtonWrapper}>
        <Button
          type="button"
          onClick={() =>
            onChange("items", [
              ...values.items,
              {
                key: crypto.randomUUID(),
                productId: 0,
                productName: "",
                qty: 1,
              },
            ])
          }
        >
          <Plus size={16} aria-hidden="true" />
          Add product
        </Button>
      </div>
    </>
  );
};
