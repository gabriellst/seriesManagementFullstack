import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const { token } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    if (!token) {
      void refresh();
    }
  }, []);

  return <Outlet />;
}
