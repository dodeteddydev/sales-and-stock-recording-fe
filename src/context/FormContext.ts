import { createContext } from "react";

export type FormValues = Record<string, unknown>;

export type FormContextValue = {
  values: FormValues;
  onChange: (name: string, value: unknown) => void;
};

export const FormContext = createContext<FormContextValue | undefined>(
  undefined,
);
