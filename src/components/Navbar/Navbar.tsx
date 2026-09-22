import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";
import { capitalizeText } from "@/utilities/capitalizeText";

type NavbarProps = {
  onMenuClick: () => void;
};

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const location = useLocation();

  const menu = location.pathname.split("/")[1];

  const title = `${capitalizeText(menu)} Page`;

  return (
    <header className={styles.navbar}>
      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <Menu size={25} />
      </button>

      <p className={styles.title}>{title}</p>
    </header>
  );
};
