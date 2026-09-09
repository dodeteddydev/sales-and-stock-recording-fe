import type { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
};

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};
