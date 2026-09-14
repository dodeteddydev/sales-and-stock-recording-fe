import { useEffect, useState } from "react";

export const useGetData = <TParams, TResponse>(
  params: TParams,
  fetcher: (params: TParams) => Promise<TResponse>,
  onSuccess?: (response: TResponse) => void,
  onError?: (error: unknown) => void,
) => {
  const [data, setData] = useState<TResponse | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const result = await fetcher(params);

        setData(result);
        onSuccess?.(result);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [params, fetcher, onSuccess, onError]);

  return {
    data,
    isLoading,
  };
};
