import { Edit } from "lucide-react";

import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { Table } from "@/components/Table/Table";
import { Td } from "@/components/Table/Td";
import { Th } from "@/components/Table/Th";
import type { ListResponse } from "@/types/response";
import { formatDate } from "@/utilities/formatDate";
import type { CustomerResponse } from "../types/customer";

import { EmptyState } from "@/components/EmpyState/EmptyState";
import styles from "./CustomerTable.module.css";

type CustomerTableProps = {
  isLoading: boolean;
  data?: ListResponse<CustomerResponse[]>;
};

export const CustomerTable = ({ isLoading, data }: CustomerTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>No.</Th>
          <Th>Name</Th>
          <Th>Phone</Th>
          <Th>Created</Th>
          <Th />
        </tr>
      </thead>

      <tbody>
        {data?.data && data?.data?.length > 0 && !isLoading ? (
          data?.data?.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              <Td>{index + 1}</Td>
              <Td>{item.name || "-"}</Td>
              <Td>{item.phone || "-"}</Td>
              <Td>
                <p>{item.createdBy.name || "-"}</p>
                <p className={styles.dateText}>
                  {item.createdAt ? formatDate(item.createdAt) : "-"}
                </p>
              </Td>

              <Td textEnd>
                <ButtonIcon icon={Edit} />
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
