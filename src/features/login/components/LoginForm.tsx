import { Input } from "@/components/Input/Input";
import { useFormContext } from "@/context/useFormContext";
import type { LoginRequest } from "../types/login";

export const LoginForm = () => {
  const { values, onChange } = useFormContext<LoginRequest>();

  return (
    <>
      <Input
        id="username"
        label="Username"
        placeholder="e.g. johndoe"
        type="text"
        value={values.username}
        onChange={(e) => onChange("username", e.target.value)}
        required
      />

      <Input
        id="password"
        label="Password"
        placeholder="e.g. 123456"
        type="password"
        value={values.password}
        onChange={(e) => onChange("password", e.target.value)}
        required
      />
    </>
  );
};
