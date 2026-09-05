import type { ReactNode } from "react";
import { FormContext, type FormValues } from "./FormContext";

type FormProviderProps<T extends FormValues> = {
  children: ReactNode;
  values: T;
  onChange: <K extends keyof T>(name: K, value: T[K]) => void;
};

export const FormProvider = <T extends FormValues>({
  children,
  values,
  onChange,
}: FormProviderProps<T>) => {
  return (
    <FormContext.Provider
      value={{
        values,
        onChange: onChange as (name: string, value: unknown) => void,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
