import React from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [], useOutlet = false }) => {
  const loggedIn = localStorage.getItem("authToken");
  const userRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
  const location = useLocation();

  const userRolesLower = userRoles.map((role) => role.toLowerCase());
  const allowedRolesLower = allowedRoles.map((role) => role.toLowerCase());
  const isAuthorized = userRolesLower.some((uRole) =>
    allowedRolesLower.includes(uRole)
  );

  if (!loggedIn) {
    // login 페이지로 보내고, *로그인 후 복귀할 수 있게) 직전 위치 기억
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div></div>;
};

export default ProtectedRoute;
