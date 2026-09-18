import { Edit } from "lucide-react";

import { AuditInfo } from "@/components/AuditInfo/AuditInfo";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { EmptyState } from "@/components/EmpyState/EmptyState";
import { Table } from "@/components/Table/Table";
import { Td } from "@/components/Table/Td";
import { Th } from "@/components/Table/Th";
import { formatRupiah } from "@/utilities/formatRupiah";
import type { ProductResponse } from "../types/product";

type ProductTableProps = {
  isLoading: boolean;
  data?: ProductResponse[];
  onClickEdit: (data: ProductResponse) => void;
};

export const ProductTable = ({
  isLoading,
  data,
  onClickEdit,
}: ProductTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Product Name</Th>
          <Th>Base Price</Th>
          <Th>Sell Price</Th>
          <Th>Stock</Th>
          <Th>Created</Th>
          <Th>Updated</Th>
          <Th />
        </tr>
      </thead>

      <tbody>
        {data && data?.length > 0 && !isLoading ? (
          data?.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <Td>{item.name || "-"}</Td>
              <Td>{formatRupiah(item.basePrice ?? 0)}</Td>
              <Td>{formatRupiah(item.sellPrice ?? 0)}</Td>
              <Td>{item.stock ?? 0}</Td>
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
