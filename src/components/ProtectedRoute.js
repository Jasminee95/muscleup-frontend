import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth" state={{ message: "Du må logge inn for å få tilgang." }} />;
  }
  return children;
}