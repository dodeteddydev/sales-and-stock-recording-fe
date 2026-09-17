import { type HTMLAttributes, type ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "center" | "top";
  size?: "md" | "lg" | "xl";
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  position = "center",
  size = "md",
  className,
  ...props
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`${styles.overlay} ${styles[position]}`}
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`${styles.modal} ${styles[size]} ${className ?? ""}`}
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        <div className={styles.header}>
          {title && (
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
          )}

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
