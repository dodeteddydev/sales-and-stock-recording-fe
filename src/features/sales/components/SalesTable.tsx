import { Edit } from "lucide-react";

import { AuditInfo } from "@/components/AuditInfo/AuditInfo";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { EmptyState } from "@/components/EmpyState/EmptyState";
import { Table } from "@/components/Table/Table";
import { Td } from "@/components/Table/Td";
import { Th } from "@/components/Table/Th";
import type { SalesResponse } from "../types/sales";
import { formatRupiah } from "@/utilities/formatRupiah";

import styles from "./SalesTable.module.css";

type SalesTableProps = {
  isLoading: boolean;
  data?: SalesResponse[];
  onClickEdit: (data: SalesResponse) => void;
};

export const SalesTable = ({
  isLoading,
  data,
  onClickEdit,
}: SalesTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Products</Th>
          <Th>Price</Th>
          <Th>Qty</Th>
          <Th>Total</Th>
          <Th>Customer</Th>
          <Th>Created</Th>
          <Th>Updated</Th>
          <Th />
        </tr>
      </thead>

      <tbody>
        {data && data?.length > 0 && !isLoading ? (
          data.map((item) => (
            <tr key={item.id}>
              <Td>
                <div className={styles.saleItems}>
                  {item.items.map((saleItem, index) => (
                    <span key={`${saleItem.product.id}-${index}`}>
                      {saleItem.product.name || "-"}
                    </span>
                  ))}
                </div>
              </Td>
              <Td>
                <div className={styles.saleItems}>
                  {item.items.map((saleItem, index) => (
                    <span key={`${saleItem.product.id}-${index}`}>
                      {formatRupiah(saleItem.price ?? 0)}
                    </span>
                  ))}
                </div>
              </Td>
              <Td>
                <div className={styles.saleItems}>
                  {item.items.map((saleItem, index) => (
                    <span key={`${saleItem.product.id}-${index}`}>
                      {saleItem.qty ?? 0}
                    </span>
                  ))}
                </div>
              </Td>
              <Td>
                {formatRupiah(
                  item.total ??
                    item.items.reduce(
                      (total, saleItem) =>
                        total + (saleItem.total ?? saleItem.price * saleItem.qty),
                      0,
                    ),
                )}
              </Td>
              <Td>{item.customer.name || "-"}</Td>
              <Td>
                <AuditInfo user={item.createdBy} date={item.createdAt} />
              </Td>
              <Td>
                <AuditInfo user={item.updatedBy} date={item.updatedAt} />
              </Td>
              <Td textEnd>
                <ButtonIcon icon={Edit} onClick={() => onClickEdit(item)} />
              </Td>
            </tr>
          ))
        ) : (
          <tr>
            <Td colSpan={8}>
              <EmptyState isLoading={isLoading} />
            </Td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
