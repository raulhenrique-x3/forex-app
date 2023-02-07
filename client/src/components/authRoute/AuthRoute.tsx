import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

export const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} state={{ from: location }} replace />;
};
