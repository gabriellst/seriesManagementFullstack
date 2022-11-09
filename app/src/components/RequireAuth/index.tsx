import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth() {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
}
