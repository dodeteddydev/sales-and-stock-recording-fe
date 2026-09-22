import { Edit } from "lucide-react";

import { AuditInfo } from "@/components/AuditInfo/AuditInfo";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { EmptyState } from "@/components/EmpyState/EmptyState";
import { Table } from "@/components/Table/Table";
import { Td } from "@/components/Table/Td";
import { Th } from "@/components/Table/Th";
import { formatRupiah } from "@/utilities/formatRupiah";
import type { CashFlowResponse } from "../types/cashflow";

type CashFlowTableProps = {
  isLoading: boolean;
  data?: CashFlowResponse[];
  onClickEdit: (data: CashFlowResponse) => void;
};

export const CashFlowTable = ({
  isLoading,
  data,
  onClickEdit,
}: CashFlowTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Type</Th>
          <Th>Category</Th>
          <Th>Amount</Th>
          <Th>Note</Th>
          <Th>Created</Th>
          <Th>Updated</Th>
          <Th />
        </tr>
      </thead>

      <tbody>
        {data && data?.length > 0 && !isLoading ? (
          data?.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <Td>{item.type || "-"}</Td>
              <Td>{item.category || "-"}</Td>
              <Td>{formatRupiah(item.amount ?? 0)}</Td>
              <Td>{item.note || "-"}</Td>
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
            <Td colSpan={5}>
              <EmptyState isLoading={isLoading} />
            </Td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
