import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
