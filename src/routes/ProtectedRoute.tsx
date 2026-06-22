import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ isAuthenticated, children }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
