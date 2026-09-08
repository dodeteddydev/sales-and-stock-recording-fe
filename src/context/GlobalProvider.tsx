import { useState, type ReactNode } from "react";

import { STORAGE_KEYS } from "@/constans/storageKey";
import { GlobalContext } from "./GlobalContext";

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean>(
    () => Boolean(localStorage.getItem(STORAGE_KEYS.accessToken)),
  );

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated: isAuthenticatedState,
        setIsAuthenticated: setIsAuthenticatedState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
