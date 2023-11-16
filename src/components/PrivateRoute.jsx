import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ children, redirectTo = "/Login" }) {
	const isAuthenticated = localStorage.getItem("token");

	if (!isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}
	return <Outlet />;
}
