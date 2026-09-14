import { useState } from "react";

export const useMutation = <TRequest, TResponse>(
  fetcher: (data: TRequest) => Promise<TResponse>,
  onSuccess?: (response: TResponse) => void,
  onError?: (error: unknown) => void,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (request: TRequest) => {
    try {
      setIsLoading(true);

      const result = await fetcher(request);

      onSuccess?.(result);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};
