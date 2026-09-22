import { Navigate, Route, Routes } from "react-router-dom";

import { NotFoundPage } from "@/components/NotFound/NotFound";
import { useGlobalContext } from "@/context/useGlobalContext";
import { CashFlowPage } from "@/features/cashflow/pages/CashFlowPage";
import { CustomerPage } from "@/features/customer/pages/CustomerPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { LoginPage } from "@/features/login/pages/LoginPage";
import { ProductPage } from "@/features/product/pages/ProductPage";
import { RestockPage } from "@/features/restock/pages/RestockPage";
import { SalesPage } from "@/features/sales/pages/SalesPage";
import { MainLayout } from "@/layouts/MainLayout";
import { pathRoutes } from "./pathRoutes";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  const { isAuthenticated } = useGlobalContext();

  return (
    <Routes>
      {/* Public */}
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

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={pathRoutes.dashboard} element={<DashboardPage />} />
        <Route path={pathRoutes.customer} element={<CustomerPage />} />
        <Route path={pathRoutes.product} element={<ProductPage />} />
        <Route path={pathRoutes.restock} element={<RestockPage />} />
        <Route path={pathRoutes.sales} element={<SalesPage />} />
        <Route path={pathRoutes.cashFlow} element={<CashFlowPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
