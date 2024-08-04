import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Protected() {
  const { isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>{!isLoading && <> {user ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}${location.search}`} />}</>}</>
  );
}
