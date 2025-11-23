import { Navigate } from "react-router";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
