import {
  SelectOption,
  type SelectOptionType,
} from "@/components/SelectOption/SelectOption";
import type { GroupBase, SingleValue } from "react-select";
import type { LoadOptions } from "react-select-async-paginate";
import { getCustomer } from "../services/customerService";

type SelectCustomerProps = {
  value: SelectOptionType | null;
  onChange: (value: SingleValue<SelectOptionType>) => void;
};

export const SelectCustomer = ({ value, onChange }: SelectCustomerProps) => {
  const loadOptions: LoadOptions<
    SelectOptionType,
    GroupBase<SelectOptionType>,
    { page: number }
  > = async (search, _loadedOptions, additional) => {
    const page = additional?.page ?? 1;

    const response = await getCustomer({
      search,
      page,
      limit: 10,
    });

    const customers = response.data.data;

    const options: SelectOptionType[] = customers.map((customer) => ({
      label: customer.name,
      value: String(customer.id),
    }));

    return {
      options,
      hasMore: customers.length === 10,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <SelectOption
      label="Customer"
      placeholder="Select a customer..."
      loadOptions={loadOptions}
      additional={{ page: 1 }}
      debounceTimeout={300}
      value={value}
      onChange={onChange}
      isClearable
      required
    />
  );
};
