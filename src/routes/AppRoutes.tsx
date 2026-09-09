import { Navigate, Route, Routes } from "react-router-dom";

import { useGlobalContext } from "@/context/useGlobalContext";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { LoginPage } from "@/features/login/pages/LoginPage";
import { pathRoutes } from "./pathRoutes";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  const { isAuthenticated } = useGlobalContext();

  return (
    <Routes>
      {/* Login */}
      <Route
        path={pathRoutes.auth}
        element={
          isAuthenticated ? (
            <Navigate to={pathRoutes.dashboard} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Dashboard */}
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
