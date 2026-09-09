import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";

import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  const [isSidebarOper, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={isSidebarOper}
        onClose={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className={styles.main}>
        <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
