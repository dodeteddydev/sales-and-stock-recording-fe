import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

import styles from "./ButtonIcon.module.css";

type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
};

export const ButtonIcon = ({ icon: Icon, ...props }: ButtonIconProps) => {
  return (
    <button className={styles.buttonIcon} {...props}>
      <Icon size={20} />
    </button>
  );
};
