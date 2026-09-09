import { Menu } from "lucide-react";

import styles from "./Navbar.module.css";

type NavbarProps = {
  onMenuClick: () => void;
};

export const Navbar = ({ onMenuClick }: NavbarProps) => {
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

      <p className={styles.title}>Dashboard</p>
    </header>
  );
};
