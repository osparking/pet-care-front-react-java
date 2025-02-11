import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [], useOutlet = false }) => {
  const loggedIn = localStorage.getItem("authToken");
  const userRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
  const location = useLocation();

  if (!loggedIn) {
    // login 페이지로 보내고, (로그인 후 복귀할 수 있게) 직전 위치 기억
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRolesLower = userRoles.map((role) => role.toLowerCase());
  const allowedRolesLower = allowedRoles.map((role) => role.toLowerCase());
  const isAuthorized = userRolesLower.some((uRole) =>
    allowedRolesLower.includes(uRole)
  );

  if (isAuthorized) {
    // Outlet 태그 혹은 자식 성분을 표출
    return useOutlet ? <Outlet /> : children;
  } else {
    // 접근 비인가 페이지로 재방향
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

};

export default ProtectedRoute;
