import { Route, Routes } from "react-router-dom";

import { pathRoutes } from "./pathRoutes";
import { ProtectedRoute } from "./ProtectedRoute";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";

export const AppRoutes = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path={pathRoutes.auth} element={<LoginPage />} />

      <Route
        path={pathRoutes.dashboard}
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
