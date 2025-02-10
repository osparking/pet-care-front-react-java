import React from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoutes = [],
  useOutlet = false,
}) => {
  const authToken = localStorage.getItem("authToken");
  const userRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
  const location = useLocation();
  
  return <div></div>;
};

export default ProtectedRoute;
