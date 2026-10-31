import {
  SelectOption,
  type SelectOptionType,
} from "@/components/SelectOption/SelectOption";
import type { GroupBase, SingleValue } from "react-select";
import type { LoadOptions } from "react-select-async-paginate";
import { getProduct } from "../services/productService";

type SelectProductProps = {
  id?: string;
  value: SelectOptionType | null;
  onChange: (value: SingleValue<SelectOptionType>) => void;
  isDisabled?: boolean;
};

export const SelectProduct = ({
  id,
  value,
  onChange,
  isDisabled,
}: SelectProductProps) => {
  const loadOptions: LoadOptions<
    SelectOptionType,
    GroupBase<SelectOptionType>,
    { page: number }
  > = async (search, _loadedOptions, additional) => {
    const page = additional?.page ?? 1;

    const response = await getProduct({
      search,
      page,
      limit: 10,
    });

    const products = response.data.data;

    const options: SelectOptionType[] = products.map((product) => ({
      label: product.name,
      value: String(product.id),
    }));

    return {
      options,
      hasMore: products.length === 10,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <SelectOption
      label="Product"
      id={id}
      placeholder="Select a product..."
      loadOptions={loadOptions}
      additional={{ page: 1 }}
      debounceTimeout={300}
      value={value}
      onChange={onChange}
      isClearable
      required
      isDisabled={isDisabled}
    />
  );
};
