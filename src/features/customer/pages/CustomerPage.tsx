import { CustomerFilters } from "../components/CustomerFilters";
import { CustomerTable } from "../components/CustomerTable";
import { useGetCustomer } from "../hooks/useGetCustomer";

export const CustomerPage = () => {
  const { isLoading, data, filters, handleChangeFilter } = useGetCustomer();

  return (
    <main>
      <CustomerFilters value={filters} onChange={handleChangeFilter} />

      <CustomerTable isLoading={isLoading} data={data?.data} />
    </main>
  );
};
