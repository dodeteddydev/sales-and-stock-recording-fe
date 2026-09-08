import { createContext } from "react";

export type GlobalContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined,
);
