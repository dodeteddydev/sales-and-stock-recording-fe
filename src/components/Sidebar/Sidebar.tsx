import {
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Package,
  RotateCcw,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import LogoSangaSanga from "@/assets/images/sanga-sanga.webp";
import { pathRoutes } from "@/routes";

import styles from "./Sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigationItems = [
    {
      label: "Dashboard",
      path: pathRoutes.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Customers",
      path: pathRoutes.customer,
      icon: UserRound,
    },
    {
      label: "Products",
      path: pathRoutes.product,
      icon: Package,
    },
    {
      label: "Restock",
      path: pathRoutes.restock,
      icon: RotateCcw,
    },
    {
      label: "Sales",
      path: pathRoutes.sales,
      icon: ShoppingCart,
    },
    {
      label: "Cash Flow",
      path: pathRoutes.cashFlow,
      icon: CircleDollarSign,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <img src={LogoSangaSanga} alt="logo" />
            <p>Mandalika Store</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.navigation}>
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button type="button" className={styles.logout} aria-label="Logout">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};
