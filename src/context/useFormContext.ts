import { useContext } from "react";

import { FormContext, type FormValues } from "./FormContext";

export const useFormContext = <T extends FormValues>() => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }

  return {
    values: context.values as T,
    onChange: context.onChange as <K extends keyof T>(
      name: K,
      value: T[K],
    ) => void,
  };
};
