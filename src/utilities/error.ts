import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.errors ?? "Something went wrong";
  }

  return "Something went wrong";
};
