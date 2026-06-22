import { Route, Routes } from "react-router-dom";

import { PATHS } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";

export const AppRoutes = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path={PATHS.auth} element={<LoginPage />} />

      <Route
        path={PATHS.dashboard}
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
