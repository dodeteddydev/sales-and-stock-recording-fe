import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = ({ label, error, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === "password";

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          {...props}
          type={isPassword && showPassword ? "text" : props.type}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
