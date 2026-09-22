import { Edit } from "lucide-react";

import { AuditInfo } from "@/components/AuditInfo/AuditInfo";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { EmptyState } from "@/components/EmpyState/EmptyState";
import { Table } from "@/components/Table/Table";
import { Td } from "@/components/Table/Td";
import { Th } from "@/components/Table/Th";
import type { RestockResponse } from "../types/restock";

type RestockTableProps = {
  isLoading: boolean;
  data?: RestockResponse[];
  onClickEdit: (data: RestockResponse) => void;
};

export const RestockTable = ({
  isLoading,
  data,
  onClickEdit,
}: RestockTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Product Restock</Th>
          <Th>Qty</Th>
          <Th>Created</Th>
          <Th>Updated</Th>
          <Th />
        </tr>
      </thead>

      <tbody>
        {data && data?.length > 0 && !isLoading ? (
          data?.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <Td>{item.product.name || "-"}</Td>
              <Td>{item.qty ?? 0}</Td>
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
            <Td colSpan={6}>
              <EmptyState isLoading={isLoading} />
            </Td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
